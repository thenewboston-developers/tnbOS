import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import {setMessageBlock} from 'apps/Chat/blocks';
import Button, {ButtonType} from 'apps/Chat/components/Button';
import {Input} from 'apps/Chat/components/FormElements';
import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {setMessage} from 'apps/Chat/store/messages';
import {DeliveryStatus} from 'apps/Chat/types';
import {useRecipientsDefaultNetworkId} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {displayErrorToast} from 'system/utils/toast';
import * as S from './Styles';

export interface EditMessageModalProps {
  close(): void;
  content: string;
  messageId: string;
}

const EditMessageModal: SFC<EditMessageModalProps> = ({className, close, content, messageId}) => {
  const activeChat = useSelector(getActiveChat);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getMessages);
  const recipientsDefaultNetworkId = useRecipientsDefaultNetworkId(activeChat!);

  const initialValues = {
    content,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues) => {
    try {
      const message = messages[messageId];
      const newMessage = {
        ...message,
        ...{
          content: values.content,
          modifiedDate: currentSystemDate(),
        },
      };

      if (recipientsDefaultNetworkId) {
        await setMessageBlock({
          amount: 0,
          networkId: recipientsDefaultNetworkId,
          params: newMessage,
          recipient: message.recipient,
        });
      }

      dispatch(setMessage(newMessage));

      dispatch(
        setDelivery({
          delivery: {
            attempts: 1,
            status: DeliveryStatus.pending,
          },
          messageId,
        }),
      );

      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error editing the message');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit Message">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <S.Form>
            <Input errors={errors} name="content" touched={touched} />
            <S.ButtonContainer>
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Submit"
                type={ButtonType.submit}
              />
            </S.ButtonContainer>
          </S.Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default EditMessageModal;
