import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Chat/components/Button';
import NetworkSelector from 'apps/Chat/containers/Right/NetworkSelector';
import {useActiveNetwork} from 'apps/Chat/hooks';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {setContact} from 'apps/Chat/store/contacts';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {setMessage} from 'apps/Chat/store/messages';
import {DeliveryStatus} from 'apps/Chat/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {displayErrorToast} from 'system/utils/toast';
import * as S from './Styles';

const MessageForm: SFC = ({className}) => {
  const activeChat = useSelector(getActiveChat);
  const activeNetwork = useActiveNetwork();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    amount: '',
    content: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const content = values.content;
      const messageId = crypto.randomUUID();
      const now = currentSystemDate();
      const recipient = activeChat!;

      // TODO: Send block here

      dispatch(
        setContact({
          accountNumber: recipient,
          lastActivityDate: now,
          lastMessageId: messageId,
        }),
      );

      dispatch(
        setMessage({
          content,
          createdDate: now,
          messageId,
          modifiedDate: now,
          recipient,
          sender: self.accountNumber,
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

      resetForm();
    } catch (error) {
      displayErrorToast('Error sending the message');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string(),
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={false}
      validationSchema={validationSchema}
    >
      {({dirty, errors, isSubmitting, isValid, touched}) => (
        <S.Form className={className}>
          <NetworkSelector />
          {activeNetwork ? (
            <S.AmountInput
              errors={errors}
              name="amount"
              placeholder={activeNetwork.displayName || ''}
              touched={touched}
            />
          ) : null}
          <S.ContentInput errors={errors} name="content" placeholder="New Message" touched={touched} />
          <S.Button
            dirty={dirty}
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            isValid={isValid}
            text=""
            type={ButtonType.submit}
          />
        </S.Form>
      )}
    </Formik>
  );
};

export default MessageForm;
