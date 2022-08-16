import {useMemo} from 'react';
import {Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Chat/components/Button';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

const MessageForm: SFC = ({className}) => {
  const initialValues = {
    amount: '',
    content: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    console.log(values);
    console.log(resetForm);
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
