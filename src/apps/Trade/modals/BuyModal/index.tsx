import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {createOrderBlock} from 'apps/Trade/blocks';
import Amount from 'apps/Trade/components/Amount';
import Button, {ButtonType} from 'apps/Trade/components/Button';
import {ButtonContainer, FormBody, Input} from 'apps/Trade/components/FormElements';
import Modal from 'apps/Trade/components/Modal';
import OrderFormLayout from 'apps/Trade/components/OrderFormLayout';
import {APPROVAL_WINDOW_SECONDS, PAYMENT_WINDOW_SECONDS} from 'apps/Trade/constants/protocol';
import {useActiveNetworkBalance} from 'apps/Trade/hooks';
import {setActivePage} from 'apps/Trade/store/manager';
import {setOrder} from 'apps/Trade/store/orders';
import {setReceivingAccount} from 'apps/Trade/store/receivingAccounts';
import {ApprovalStatus, FillStatus, Offer, Order, Page, PaymentStatus} from 'apps/Trade/types';
import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {getBalances, getNetworkAccountOnlineStatuses, getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {systemDate} from 'system/utils/dates';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {generateAccount} from 'system/utils/tnb';
import {displayErrorToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

interface BuyModalProps {
  close(): void;
  offer: Offer;
}

const BuyModal: SFC<BuyModalProps> = ({className, close, offer}) => {
  const buyersIncomingAsset = offer.clientAsset;
  const buyersOutgoingAsset = offer.hostAsset;

  const activeNetworkBalance = useActiveNetworkBalance();
  const balances = useSelector(getBalances);
  const buyersIncomingAssetDisplayName = useNetworkDisplayName(buyersIncomingAsset, 16);
  const buyersIncomingAssetLogo = useNetworkDisplayImage(buyersIncomingAsset);
  const buyersOutgoingAssetLogo = useNetworkDisplayImage(buyersOutgoingAsset);
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const self = useSelector(getSelf);

  const initialValues = {
    buyersIncomingAssetQuantity: '',
    total: '',
  };

  type FormValues = typeof initialValues;

  const calculateAssetQuantity = (totalStr: string): string => {
    const total = parseFloat(totalStr);
    if (isNaN(total)) return '';
    const price = offer.saleTerms.price;
    const assetQuantity = total / price;
    return assetQuantity.toString();
  };

  const calculateTotal = (assetQuantityStr: string): string => {
    const assetQuantity = parseFloat(assetQuantityStr);
    if (isNaN(assetQuantity)) return '';
    const price = offer.saleTerms.price;
    const total = assetQuantity * price;
    return total.toString();
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const now = new Date();
    const approvalExpirationDate = new Date(now.getTime() + APPROVAL_WINDOW_SECONDS * 1000);
    const paymentExpirationDate = new Date(now.getTime() + PAYMENT_WINDOW_SECONDS * 1000);
    const keypair = generateAccount();
    const orderId = crypto.randomUUID();

    const order: Order = {
      approvalExpirationDate: systemDate(approvalExpirationDate),
      approvalStatus: ApprovalStatus.pending,
      client: {
        accountNumber: self.accountNumber,
        outgoingAmount: parseInt(values.total, 10),
        outgoingAsset: buyersOutgoingAsset,
        receivingAddress: keypair.publicKeyHex,
      },
      createdDate: systemDate(now),
      fillStatus: FillStatus.none,
      host: {
        accountNumber: offer.host,
        outgoingAmount: parseInt(values.buyersIncomingAssetQuantity, 10),
        outgoingAsset: buyersIncomingAsset,
        receivingAddress: null,
      },
      orderId,
      paymentExpirationDate: systemDate(paymentExpirationDate),
      paymentStatus: PaymentStatus.none,
    };

    const receivingAccount = {
      accountNumber: keypair.publicKeyHex,
      fundsTransferredOut: false,
      networkId: buyersIncomingAsset,
      orderId,
      signingKey: keypair.signingKeyHex,
    };

    const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
      balances,
      networkAccountOnlineStatuses,
      recipient: offer.host,
    });

    if (!recipientsDefaultNetworkId) {
      displayErrorToast('Unable to connect to host');
      return;
    }

    dispatch(setOrder(order));
    dispatch(setReceivingAccount(receivingAccount));

    try {
      await createOrderBlock({
        networkId: recipientsDefaultNetworkId,
        params: order,
        recipient: offer.host,
      });

      dispatch(setActivePage(Page.orders));
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      buyersIncomingAssetQuantity: yup
        .number()
        .required('Purchase amount is a required field')
        .integer('Purchase amount must be an integer')
        .max(offer.saleTerms.orderMax, `Maximum purchase amount is ${offer.saleTerms.orderMax}`)
        .min(offer.saleTerms.orderMin, `Minimum purchase amount is ${offer.saleTerms.orderMin}`),
      total: yup
        .number()
        .required('Total cost is a required field')
        .integer('Total cost must be an integer')
        .min(0)
        .test(
          'total-does-not-exceed-balance',
          `Total cost exceeds account balance of ${activeNetworkBalance.toLocaleString()}`,
          (total) => {
            if (!total) return true;
            return total <= activeNetworkBalance;
          },
        ),
    });
  }, [activeNetworkBalance, offer.saleTerms.orderMax, offer.saleTerms.orderMin]);

  return (
    <Modal className={className} close={close} header={`Buy ${buyersIncomingAssetDisplayName}`}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, handleChange, isSubmitting, isValid, touched, values}) => (
          <Form>
            <OrderFormLayout
              left={
                <>
                  <S.User accountNumber={offer.host} description="Seller" />
                  <Amount
                    amount={offer.saleTerms.price}
                    amountLabel="Price"
                    bottomText={`Limits: ${offer.saleTerms.orderMin.toLocaleString()} - ${offer.saleTerms.orderMax.toLocaleString()} ${buyersIncomingAssetDisplayName}`}
                    leftAlign={true}
                    networkId={buyersOutgoingAsset}
                  />
                </>
              }
              right={
                <>
                  <FormBody>
                    <Input
                      errors={errors}
                      label="Purchase Amount"
                      logo={buyersIncomingAssetLogo}
                      name="buyersIncomingAssetQuantity"
                      onChange={(e) => {
                        handleChange(e);
                        values.total = calculateTotal(e.target.value);
                      }}
                      touched={touched}
                      type="number"
                    />
                    <Input
                      errors={errors}
                      label="Total Cost"
                      logo={buyersOutgoingAssetLogo}
                      name="total"
                      onChange={(e) => {
                        handleChange(e);
                        values.buyersIncomingAssetQuantity = calculateAssetQuantity(e.target.value);
                      }}
                      touched={touched}
                      type="number"
                    />
                  </FormBody>
                </>
              }
            />
            <ButtonContainer>
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Place Purchase Order"
                type={ButtonType.submit}
              />
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BuyModal;
