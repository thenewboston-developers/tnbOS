import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import {isDevelopment} from 'shared/utils/environment';
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

  const developmentInitialValues = {
    port: network?.port || '',
    protocol: network?.protocol || '',
  };

  const initialValues = {
    ...(isDevelopment ? developmentInitialValues : {}),
    displayImage: network?.displayImage || '',
    displayName: network?.displayName || '',
    domain: network?.domain || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const protocol = network?.protocol || NetworkProtocol.https;
      dispatch(
        setNetwork({
          ...values,
          id: network?.id || crypto.randomUUID(),
          port: network?.port || undefined,
          protocol,
        }),
      );
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    // TODO: Proper validation including checking uniqueness of domain (if domain changed or network does not have
    //  any id yet "new network")
    // TODO: Ensure port is not 0 (also check upper bounds)

    const developmentFields = {
      port: yup.number().integer(),
      protocol: yup.string(),
    };

    return yup.object().shape({
      ...(isDevelopment ? developmentFields : {}),
      displayImage: yup.string(),
      displayName: yup.string(),
      domain: yup.string(),
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
            <Input errors={errors} label="Domain" name="domain" touched={touched} />
            {isDevelopment ? (
              <>
                <Input errors={errors} label="Protocol" name="protocol" touched={touched} />
                <Input errors={errors} label="Port" name="port" touched={touched} type="number" />
              </>
            ) : null}
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
