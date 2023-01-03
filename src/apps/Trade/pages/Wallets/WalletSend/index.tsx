import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Trade/components/Button';
import {Input} from 'apps/Trade/components/FormElements';
import {useActiveWalletNetwork, useTradeBalances} from 'apps/Trade/hooks';
import {setActiveWalletTab} from 'apps/Trade/store/manager';
import {WalletTab} from 'apps/Trade/types';
import {AppDispatch, SFC} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';
import * as S from './Styles';

const WalletSend: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const dispatch = useDispatch<AppDispatch>();
  const {available} = useTradeBalances(activeWalletNetwork!.networkId);

  const initialValues = {
    amount: '',
    to: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      console.log(values);
      dispatch(setActiveWalletTab(WalletTab.home));
      resetForm();
    } catch (error) {
      console.error(error);
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
