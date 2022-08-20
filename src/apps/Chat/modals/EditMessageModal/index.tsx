import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';

import Button, {ButtonType} from 'apps/Chat/components/Button';
import {Input} from 'apps/Chat/components/FormElements';
import {editMessageContent} from 'apps/Chat/store/messages';
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

  const initialValues = {
    content,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues) => {
    const updatedData = {
      content: values.content,
      modifiedDate: currentSystemDate(),
    };
    dispatch(editMessageContent({messageId, ...updatedData}));
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
