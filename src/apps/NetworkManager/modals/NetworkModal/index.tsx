import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {isDevelopment} from 'shared/utils/environment';
import Button, {ButtonType} from 'system/components/Button';
import {Input} from 'system/components/FormElements';
import Modal from 'system/components/Modal';
import {getNetworks} from 'system/selectors/state';
import {setNetwork} from 'system/store/networks';
import {AppDispatch, Network, NetworkProtocol, SFC} from 'system/types';
import yup from 'system/utils/forms/yup';

export interface NetworkModalProps {
  close(): void;
  network?: Network;
}

const NetworkModal: SFC<NetworkModalProps> = ({className, close, network}) => {
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);

  const developmentInitialValues = {
    port: network?.port?.toString() || '',
    protocol: network?.protocol || '',
  };

  const initialValues = {
    ...(isDevelopment ? developmentInitialValues : {}),
    displayImage: network?.displayImage || '',
    displayName: network?.displayName || '',
    domain: network?.domain || '',
  };

  type FormValues = typeof initialValues;

  const getModalTitle = () => {
    const verb = network?.id ? 'Edit' : 'Add';
    return `${verb} Network`;
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      dispatch(
        setNetwork({
          ...values,
          id: network?.id || crypto.randomUUID(),
          port: values.port?.toString() ? parseInt(values.port, 10) : undefined,
          protocol: (values.protocol as NetworkProtocol) || network?.protocol || NetworkProtocol.https,
        }),
      );
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    const developmentFields = {
      port: yup.number().integer().max(65535).min(0),
      protocol: yup
        .string()
        .required()
        .test('is-valid-protocol', 'Invalid protocol', (value: any) => Object.values(NetworkProtocol).includes(value)),
    };

    return yup.object().shape({
      ...(isDevelopment ? developmentFields : {}),
      displayImage: yup.string().required(),
      displayName: yup.string().required(),
      domain: yup
        .string()
        .required()
        .test('domain-is-unique', 'Network with this domain already exists', (value: any) => {
          let networkList = Object.values(networks);
          if (network?.id) networkList = networkList.filter(({domain}) => domain !== network.domain);
          const domains = networkList.map(({domain}) => domain);
          return !domains.includes(value);
        }),
    });
  }, [network?.domain, network?.id, networks]);

  return (
    <Modal className={className} close={close} header={getModalTitle()}>
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
            <Input errors={errors} label="Display Name" name="displayName" touched={touched} />
            <Input errors={errors} label="Logo URL" name="displayImage" touched={touched} />
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
