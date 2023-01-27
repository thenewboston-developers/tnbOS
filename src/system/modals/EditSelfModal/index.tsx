import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'system/components/Button';
import {Input} from 'system/components/FormElements';
import Modal from 'system/components/Modal';
import {getSelf} from 'system/selectors/state';
import {updateSelf} from 'system/store/self';
import {AppDispatch, SFC} from 'system/types';
import yup from 'system/utils/yup';

export interface EditSelfModalProps {
  close(): void;
}

const EditSelfModal: SFC<EditSelfModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    displayImage: self.displayImage || '',
    displayName: self.displayName || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      dispatch(updateSelf(values));
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      displayImage: yup.string().url().required(),
      displayName: yup.string().required(),
    });
  }, []);

  return (
    <Modal className={className} close={close} header="Edit Profile">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Avatar URL" name="displayImage" touched={touched} />
            <Input errors={errors} label="Display Name" name="displayName" touched={touched} />
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

export default EditSelfModal;
