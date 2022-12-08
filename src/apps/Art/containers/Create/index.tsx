import {Form, Formik} from 'formik';
import noop from 'lodash/noop';

import Button, {ButtonType} from 'apps/Art/components/Button';
import {Input} from 'apps/Art/components/FormElements';
import {SFC} from 'system/types';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Left>
        <Formik initialValues={{}} onSubmit={noop} validateOnMount={false}>
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <Input errors={errors} label="Image URL" name="url" placeholder="Enter URL" touched={touched} />
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
      <S.Right>Right</S.Right>
    </S.Container>
  );
};

export default Create;
