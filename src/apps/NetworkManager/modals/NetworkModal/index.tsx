import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'system/components/Button';
import {Input} from 'system/components/FormElements';
import Modal from 'system/components/Modal';
import {setNetwork} from 'system/store/networks';
import {AppDispatch, Network, NetworkProtocol, SFC} from 'system/types';
import yup from 'system/utils/forms/yup';

export interface NetworkModalProps {
  close(): void;
  network?: Network;
}

const NetworkModal: SFC<NetworkModalProps> = ({className, close, network}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    displayImage: network?.displayImage || '',
    displayName: network?.displayName || '',
    networkId: network?.networkId || '',
    protocol: network?.protocol || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      dispatch(
        setNetwork({
          ...values,
          protocol: NetworkProtocol.https,
        }),
      );
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    // TODO: Proper validation including checking uniqueness of network ID
    return yup.object().shape({
      displayImage: yup.string(),
      displayName: yup.string(),
      networkId: yup.string(),
      protocol: yup.string(),
    });
  }, []);

  return (
    <Modal className={className} close={close} header="Add/Edit Network">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Network ID" name="networkId" touched={touched} />
            <Input errors={errors} label="Protocol" name="protocol" touched={touched} />
            <Input errors={errors} label="Display Image" name="displayImage" touched={touched} />
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

export default NetworkModal;
