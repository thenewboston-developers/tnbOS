import {useMemo} from 'react';
import {Formik} from 'formik';

import Button, {ButtonType} from 'apps/Chat/components/Button';
import {Input} from 'apps/Chat/components/FormElements';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

export interface AddContactModalProps {
  close(): void;
}

const EditMessageModal: SFC<AddContactModalProps> = ({className, close}) => {
  const initialValues = {
    content: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues) => {
    console.log(values);
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
