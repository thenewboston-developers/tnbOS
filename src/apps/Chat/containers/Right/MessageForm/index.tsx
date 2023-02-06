import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';

import {setMessageBlock} from 'apps/Chat/blocks';
import AccountAttachment from 'apps/Chat/components/AccountAttachment';
import AttachmentSelector from 'apps/Chat/components/AttachmentSelector';
import {ButtonType} from 'apps/Chat/components/Button';
import NetworkSelector from 'apps/Chat/components/NetworkSelector';
import {useActiveNetwork, useActiveNetworkBalance} from 'apps/Chat/hooks';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {setContact} from 'apps/Chat/store/contacts';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {setMessage} from 'apps/Chat/store/messages';
import {DeliveryStatus, Transfer} from 'apps/Chat/types';
import {useRecipientsDefaultNetworkId} from 'system/hooks';
import {getAccounts, getNetworks, getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

const MessageForm: SFC = ({className}) => {
  const [attachedAccountNumbers, setAttachedAccountNumbers] = useState<string[]>([]);
  const [attachedNetworkIds, setAttachedNetworkIds] = useState<string[]>([]);
  const accounts = useSelector(getAccounts);
  const activeChat = useSelector(getActiveChat);
  const activeNetwork = useActiveNetwork();
  const activeNetworkBalance = useActiveNetworkBalance();
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);
  const recipientsDefaultNetworkId = useRecipientsDefaultNetworkId(activeChat!);
  const self = useSelector(getSelf);

  const initialValues = {
    amount: '',
    content: '',
  };

  type FormValues = typeof initialValues;

  const getAttachedAccounts = () => {
    return attachedAccountNumbers.map((accountNumber) => accounts[accountNumber]);
  };

  const getAttachedNetworks = () => {
    return attachedNetworkIds.map((networkId) => networks[networkId]);
  };

  const getIsDirty = (isFormDirty: boolean): boolean => {
    if (attachedAccountNumbers || attachedNetworkIds) return true;
    return isFormDirty;
  };

  const getIsValid = (isFormValid: boolean, values: FormValues): boolean => {
    const {amount, content} = values;
    if (amount || content) return isFormValid;
    return !!attachedAccountNumbers.length || !!attachedNetworkIds.length;
  };

  const getTransfer = (amount: number): Transfer | null => {
    if (!activeNetwork || amount === 0) return null;
    return {
      amount: amount,
      networkId: activeNetwork.networkId,
    };
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const amount = values.amount ? parseInt(values.amount, 10) : 0;
      const content = values.content;
      const messageId = crypto.randomUUID();
      const networkId = activeNetwork?.networkId || recipientsDefaultNetworkId;
      const now = currentSystemDate();
      const recipient = activeChat!;
      const transfer = getTransfer(amount);

      const message = {
        attachedAccounts: getAttachedAccounts(),
        attachedNetworks: getAttachedNetworks(),
        content,
        createdDate: now,
        messageId,
        modifiedDate: now,
        recipient,
        sender: self.accountNumber,
        transfer,
      };

      if (networkId) {
        await setMessageBlock({
          amount,
          networkId,
          params: message,
          recipient,
        });
      }

      dispatch(setMessage(message));

      dispatch(
        setContact({
          accountNumber: recipient,
          lastActivityDate: now,
          lastMessageId: messageId,
          lastSeenDate: now,
        }),
      );

      dispatch(
        setDelivery({
          delivery: {
            attempts: 1,
            status: DeliveryStatus.pending,
          },
          messageId,
        }),
      );

      setAttachedAccountNumbers([]);
      setAttachedNetworkIds([]);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error sending the message');
    }
  };

  const renderAttachmentContainer = () => {
    if (!attachedAccountNumbers.length) return null;

    const accountAttachments = attachedAccountNumbers.map((accountNumber) => (
      <AccountAttachment
        accountNumber={accountNumber}
        attachedAccountNumbers={attachedAccountNumbers}
        key={accountNumber}
        setAttachedAccountNumbers={setAttachedAccountNumbers}
      />
    ));

    return <S.AttachmentContainer>{accountAttachments}</S.AttachmentContainer>;
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      amount: yup.number().test('amount-does-not-exceed-balance', 'Invalid amount', (amount) => {
        return amount ? activeNetworkBalance >= amount : true;
      }),
      content: yup.string(),
    });
  }, [activeNetworkBalance]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={false}
      validationSchema={validationSchema}
    >
      {({dirty, errors, isSubmitting, isValid, touched, values}) => (
        <div>
          <S.Form className={className}>
            <S.ContentInput errors={errors} name="content" placeholder="New Message" touched={touched} />
            {activeNetwork ? (
              <S.AmountInput
                errors={errors}
                name="amount"
                placeholder={activeNetwork.displayName || ''}
                touched={touched}
              />
            ) : null}
            <NetworkSelector />
            <AttachmentSelector
              attachedAccountNumbers={attachedAccountNumbers}
              attachedNetworkIds={attachedNetworkIds}
              setAttachedAccountNumbers={setAttachedAccountNumbers}
              setAttachedNetworkIds={setAttachedNetworkIds}
            />
            <S.Button
              dirty={getIsDirty(dirty)}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={getIsValid(isValid, values)}
              text=""
              type={ButtonType.submit}
            />
          </S.Form>
          {renderAttachmentContainer()}
        </div>
      )}
    </Formik>
  );
};

export default MessageForm;
