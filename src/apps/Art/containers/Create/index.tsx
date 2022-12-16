import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import ArtOverview from 'apps/Art/components/ArtOverview';
import Button, {ButtonType} from 'apps/Art/components/Button';
import {Input} from 'apps/Art/components/FormElements';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const initialValues = {
    description: '',
    imageUrl: '',
    name: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    console.log(values);
  };

  const renderPreviewContainer = () => {
    return (
      <S.PreviewContainer>
        <ArtOverview />
      </S.PreviewContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      imageUrl: yup.string().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <S.Left>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <Input errors={errors} label="Image URL" name="imageUrl" placeholder="Enter URL" touched={touched} />
              <Input errors={errors} label="Name" name="name" placeholder="Enter name" touched={touched} />
              <Input
                errors={errors}
                label="Description"
                name="description"
                placeholder="Enter description"
                touched={touched}
              />
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
      </S.Left>
      <S.Right>{renderPreviewContainer()}</S.Right>
    </S.Container>
  );
};

export default Create;
