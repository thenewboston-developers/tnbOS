import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'system/components/Button';
import {Input} from 'system/components/FormElements';
import Modal from 'system/components/Modal';
import {getAccounts, getSelf} from 'system/selectors/state';
import {deleteAccount, setAccount} from 'system/store/accounts';
import {Account, AppDispatch, SFC} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

export interface AccountModalProps {
  account?: Account;
  close(): void;
}

const AccountModal: SFC<AccountModalProps> = ({account, className, close}) => {
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    accountNumber: account?.accountNumber || '',
    displayImage: account?.displayImage || '',
    displayName: account?.displayName || '',
  };

  type FormValues = typeof initialValues;

  const getModalTitle = () => {
    const verb = account ? 'Edit' : 'Add';
    return `${verb} Account`;
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      if (account && account.accountNumber !== values.accountNumber) {
        dispatch(deleteAccount(account.accountNumber));
      }
      dispatch(setAccount(values));
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      accountNumber: accountNumberSchema
        .required()
        .test('account-number-is-not-self', 'Unable to add your own account', (value: any) => {
          return value !== self.accountNumber;
        })
        .test('account-number-is-unique', 'Account with this account number already exists', (value: any) => {
          let accountList = Object.values(accounts);
          if (account) accountList = accountList.filter(({accountNumber}) => accountNumber !== account.accountNumber);
          const accountNumbers = accountList.map(({accountNumber}) => accountNumber);
          return !accountNumbers.includes(value);
        }),
      displayImage: yup.string(),
      displayName: yup.string(),
    });
  }, [account, accounts, self.accountNumber]);

  return (
    <Modal className={className} close={close} header={getModalTitle()}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Account Number" name="accountNumber" touched={touched} />
            <Input errors={errors} label="Display Name" name="displayName" touched={touched} />
            <Input errors={errors} label="Avatar URL" name="displayImage" touched={touched} />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AccountModal;
