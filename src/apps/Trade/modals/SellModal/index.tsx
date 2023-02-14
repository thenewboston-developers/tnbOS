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
import {useTradeBalances} from 'apps/Trade/hooks';
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

interface SellModalProps {
  close(): void;
  offer: Offer;
}

const SellModal: SFC<SellModalProps> = ({className, close, offer}) => {
  const sellersIncomingAsset = offer.hostAsset;
  const sellersOutgoingAsset = offer.clientAsset;

  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const self = useSelector(getSelf);
  const sellersOutgoingAssetBalances = useTradeBalances(sellersOutgoingAsset);
  const sellersIncomingAssetLogo = useNetworkDisplayImage(sellersIncomingAsset);
  const sellersOutgoingAssetDisplayName = useNetworkDisplayName(sellersOutgoingAsset, 16);
  const sellersOutgoingAssetLogo = useNetworkDisplayImage(sellersOutgoingAsset);

  const initialValues = {
    sellersOutgoingAssetQuantity: '',
    total: '',
  };

  type FormValues = typeof initialValues;

  const calculateAssetQuantity = (totalStr: string): string => {
    const total = parseFloat(totalStr);
    if (isNaN(total)) return '';
    const price = offer.purchaseTerms.price;
    const assetQuantity = total / price;
    return assetQuantity.toString();
  };

  const calculateTotal = (assetQuantityStr: string): string => {
    const assetQuantity = parseFloat(assetQuantityStr);
    if (isNaN(assetQuantity)) return '';
    const price = offer.purchaseTerms.price;
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
        outgoingAmount: parseInt(values.sellersOutgoingAssetQuantity, 10),
        outgoingAsset: sellersOutgoingAsset,
        receivingAddress: keypair.publicKeyHex,
      },
      createdDate: systemDate(now),
      fillStatus: FillStatus.none,
      host: {
        accountNumber: offer.host,
        outgoingAmount: parseInt(values.total, 10),
        outgoingAsset: sellersIncomingAsset,
        receivingAddress: null,
      },
      orderId,
      paymentExpirationDate: systemDate(paymentExpirationDate),
      paymentStatus: PaymentStatus.none,
    };

    const receivingAccount = {
      accountNumber: keypair.publicKeyHex,
      fundsTransferredOut: false,
      networkId: sellersIncomingAsset,
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
    const {available} = sellersOutgoingAssetBalances;
    return yup.object().shape({
      sellersOutgoingAssetQuantity: yup
        .number()
        .required('Sale amount is a required field')
        .integer('Sale amount must be an integer')
        .max(offer.purchaseTerms.orderMax, `Maximum sale amount is ${offer.purchaseTerms.orderMax}`)
        .min(offer.purchaseTerms.orderMin, `Minimum sale amount is ${offer.purchaseTerms.orderMin}`)
        .test(
          'total-does-not-exceed-balance',
          `Total cost exceeds available balance of ${available.toLocaleString()}`,
          (total) => {
            if (!total) return true;
            return total <= available;
          },
        ),
      total: yup.number().required('Total price is a required field').integer('Total price must be an integer').min(0),
    });
  }, [offer.purchaseTerms.orderMax, offer.purchaseTerms.orderMin, sellersOutgoingAssetBalances]);

  return (
    <Modal className={className} close={close} header={`Sell ${sellersOutgoingAssetDisplayName}`}>
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
                  <S.User accountNumber={offer.host} description="Buyer" />
                  <Amount
                    amount={offer.purchaseTerms.price}
                    amountLabel="Price"
                    bottomText={`Limits: ${offer.purchaseTerms.orderMin.toLocaleString()} - ${offer.purchaseTerms.orderMax.toLocaleString()} ${sellersOutgoingAssetDisplayName}`}
                    leftAlign={true}
                    networkId={sellersIncomingAsset}
                  />
                </>
              }
              right={
                <>
                  <FormBody>
                    <Input
                      errors={errors}
                      label="Sale Amount"
                      logo={sellersOutgoingAssetLogo}
                      name="sellersOutgoingAssetQuantity"
                      onChange={(e) => {
                        handleChange(e);
                        values.total = calculateTotal(e.target.value);
                      }}
                      touched={touched}
                      type="number"
                    />
                    <Input
                      errors={errors}
                      label="Total Price"
                      logo={sellersIncomingAssetLogo}
                      name="total"
                      onChange={(e) => {
                        handleChange(e);
                        values.sellersOutgoingAssetQuantity = calculateAssetQuantity(e.target.value);
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
                text="Place Sale Order"
                type={ButtonType.submit}
              />
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SellModal;
