import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'system/components/Button';
import {Input} from 'system/components/FormElements';
import Modal from 'system/components/Modal';
import {deleteNetwork, initializeNetworkRelatedObjects} from 'system/dispatchers/networks';
import {getNetworks} from 'system/selectors/state';
import {setNetwork} from 'system/store/networks';
import {AppDispatch, Network, NetworkProtocol, SFC} from 'system/types';
import yup from 'system/utils/yup';

export interface NetworkModalProps {
  close(): void;
  network?: Network;
}

const NetworkModal: SFC<NetworkModalProps> = ({className, close, network}) => {
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);

  const initialValues = {
    displayImage: network?.displayImage || '',
    displayName: network?.displayName || '',
    networkId: network?.networkId || '',
    port: network?.port?.toString() || '',
    protocol: network?.protocol || '',
  };

  type FormValues = typeof initialValues;

  const getModalTitle = () => {
    const verb = network ? 'Edit' : 'Add';
    return `${verb} Network`;
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const networkId = values.networkId;
      const port = values.port?.toString() ? parseInt(values.port, 10) : undefined;
      const protocol = (values.protocol as NetworkProtocol) || network?.protocol || NetworkProtocol.https;

      if (network && network.networkId !== networkId) {
        dispatch(deleteNetwork(network.networkId));
      }

      if (!network || network.networkId !== networkId) {
        dispatch(initializeNetworkRelatedObjects(networkId));
      }

      dispatch(
        setNetwork({
          ...values,
          port,
          protocol,
        }),
      );

      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo((): yup.SchemaOf<Network> => {
    return yup.object({
      displayImage: yup.string().url().required(),
      displayName: yup.string().required(),
      networkId: yup
        .string()
        .required()
        .test('network-id-is-unique', 'Network with this ID already exists', (value: any) => {
          let networkList = Object.values(networks);
          if (network) networkList = networkList.filter(({networkId}) => networkId !== network.networkId);
          const networkIds = networkList.map(({networkId}) => networkId);
          return !networkIds.includes(value);
        }),
      port: yup.number().integer().max(65535).min(0),
      protocol: yup.mixed().oneOf(Object.values(NetworkProtocol)),
    });
  }, [network, networks]);

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
            <Input errors={errors} label="Network ID" name="networkId" touched={touched} />
            <Input errors={errors} label="Protocol" name="protocol" touched={touched} />
            <Input errors={errors} label="Port" name="port" touched={touched} type="number" />
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
