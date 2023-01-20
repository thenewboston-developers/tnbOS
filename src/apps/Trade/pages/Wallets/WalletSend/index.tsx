import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Trade/components/Button';
import {Input} from 'apps/Trade/components/FormElements';
import {useActiveWalletNetwork, useTradeBalances} from 'apps/Trade/hooks';
import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {setActiveWalletTab} from 'apps/Trade/store/manager';
import {WalletTab} from 'apps/Trade/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {signData} from 'system/utils/signing';
import {displayErrorToast} from 'system/utils/toast';
import yup, {accountNumberSchema} from 'system/utils/yup';
import * as S from './Styles';

const WalletSend: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId)!;
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const {available} = useTradeBalances(activeWalletNetworkId);

  const initialValues = {
    amount: '',
    to: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const data: UnsignedBlock = {
        amount: parseInt(values.amount, 10),
        id: crypto.randomUUID(),
        payload: {},
        recipient: values.to,
        sender: self.accountNumber,
        transaction_fee: CORE_TRANSACTION_FEE,
      };

      const block = signData(data, self.signingKey);
      await createBlock(block, activeWalletNetworkId);

      dispatch(setActiveWalletTab(WalletTab.home));
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error sending block');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .required()
        .test(
          'amount-does-not-exceed-available-balance',
          `Amount exceeds available balance of ${available}`,
          (amount) => {
            return amount ? available >= amount : true;
          },
        ),
      to: accountNumberSchema.required(),
    });
  }, [available]);

  return (
    <S.Container className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <S.Form>
            <Input errors={errors} label="To" name="to" touched={touched} />
            <Input errors={errors} label="Amount" name="amount" touched={touched} />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text={`Send ${activeWalletNetwork?.displayName}`}
              type={ButtonType.submit}
            />
          </S.Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default WalletSend;
