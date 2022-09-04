import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import Button, {ButtonType} from 'apps/Chat/components/Button';
import {Input} from 'apps/Chat/components/FormElements';
import {getMessages} from 'apps/Chat/selectors/state';
import {setDeliveryStatus} from 'apps/Chat/store/deliveryStatuses';
import {setMessage} from 'apps/Chat/store/messages';
import {DeliveryStatus} from 'apps/Chat/types';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

export interface EditMessageModalProps {
  close(): void;
  content: string;
  messageId: string;
}

const EditMessageModal: SFC<EditMessageModalProps> = ({className, close, content, messageId}) => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getMessages);

  const initialValues = {
    content,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues) => {
    const message = messages[messageId];
    const updatedData = {
      content: values.content,
      modifiedDate: currentSystemDate(),
    };
    const newMessage = {...message, ...updatedData};

    // TODO: Send block here

    dispatch(setMessage(newMessage));

    dispatch(
      setDeliveryStatus({
        deliveryStatus: DeliveryStatus.pending,
        messageId,
      }),
    );

    close();
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
