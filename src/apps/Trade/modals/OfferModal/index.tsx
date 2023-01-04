import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import AssetLogo from 'apps/Trade/components/AssetLogo';
import Button, {ButtonType} from 'apps/Trade/components/Button';
import {ButtonContainer, Input} from 'apps/Trade/components/FormElements';
import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {setOffer} from 'apps/Trade/store/offers';
import {Offer} from 'apps/Trade/types';
import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import yup from 'system/utils/forms/yup';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

interface FormValues {
  purchaseOrderMax: string;
  purchaseOrderMin: string;
  purchasePrice: string;
  saleOrderMax: string;
  saleOrderMin: string;
  salePrice: string;
}

interface OfferModalProps {
  clientAsset: string;
  close(): void;
  offer?: Offer;
}

const OfferModal: SFC<OfferModalProps> = ({className, clientAsset, close, offer}) => {
  const clientAssetDisplayName = useNetworkDisplayName(clientAsset, 16);
  const clientAssetLogo = useNetworkDisplayImage(clientAsset);
  const hostAsset = useSelector(getActiveNetworkId)!;
  const hostAssetLogo = useNetworkDisplayImage(hostAsset);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = useMemo(() => {
    return {
      purchaseOrderMax: offer?.purchaseTerms.orderMax.toString() || '',
      purchaseOrderMin: offer?.purchaseTerms.orderMin.toString() || '',
      purchasePrice: offer?.purchaseTerms.price.toString() || '',
      saleOrderMax: offer?.saleTerms.orderMax.toString() || '',
      saleOrderMin: offer?.saleTerms.orderMin.toString() || '',
      salePrice: offer?.saleTerms.price.toString() || '',
    };
  }, [offer]);

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const {purchaseOrderMax, purchaseOrderMin, purchasePrice, saleOrderMax, saleOrderMin, salePrice} = values;

    try {
      const offerData = {
        clientAsset,
        host: self.accountNumber,
        hostAsset,
        purchaseTerms: {
          enabled: offer ? offer.purchaseTerms.enabled : false,
          orderMax: parseFloat(purchaseOrderMax),
          orderMin: parseFloat(purchaseOrderMin),
          price: parseFloat(purchasePrice),
        },
        saleTerms: {
          enabled: offer ? offer.saleTerms.enabled : false,
          orderMax: parseFloat(saleOrderMax),
          orderMin: parseFloat(saleOrderMin),
          price: parseFloat(salePrice),
        },
      };

      dispatch(setOffer(offerData));
      displayToast(`${clientAssetDisplayName} terms saved`, ToastType.success);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const renderAssetLogoContainer = () => (
    <S.AssetLogoContainer>
      <AssetLogo networkId={clientAsset} />
    </S.AssetLogoContainer>
  );

  const validationSchema = useMemo(() => {
    return yup.object({
      purchaseOrderMax: yup
        .number()
        .moreThan(0, 'Order maximum must be greater than 0')
        .required('Order maximum is a required field'),
      purchaseOrderMin: yup
        .number()
        .moreThan(0, 'Order minimum must be greater than 0')
        .required('Order minimum is a required field'),
      purchasePrice: yup
        .number()
        .moreThan(0, 'Purchase price must be greater than 0')
        .required('Purchase price is a required field'),
      saleOrderMax: yup
        .number()
        .moreThan(0, 'Order maximum must be greater than 0')
        .required('Order maximum is a required field'),
      saleOrderMin: yup
        .number()
        .moreThan(0, 'Order minimum must be greater than 0')
        .required('Order minimum is a required field'),
      salePrice: yup
        .number()
        .moreThan(0, 'Sale price must be greater than 0')
        .required('Sale price is a required field'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Offer Terms">
      {renderAssetLogoContainer()}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.FormBody>
              <div>
                <S.SectionHeading>Purchase Terms</S.SectionHeading>
                <Input
                  errors={errors}
                  label={`Purchase Price (per ${clientAssetDisplayName})`}
                  logo={hostAssetLogo}
                  name="purchasePrice"
                  touched={touched}
                  type="number"
                />
                <Input
                  errors={errors}
                  label="Order Minimum"
                  logo={clientAssetLogo}
                  name="purchaseOrderMin"
                  touched={touched}
                  type="number"
                />
                <Input
                  errors={errors}
                  label="Order Maximum"
                  logo={clientAssetLogo}
                  name="purchaseOrderMax"
                  touched={touched}
                  type="number"
                />
              </div>
              <S.SectionDivider />
              <div>
                <S.SectionHeading>Sale Terms</S.SectionHeading>
                <Input
                  errors={errors}
                  label={`Sale Price (per ${clientAssetDisplayName})`}
                  logo={hostAssetLogo}
                  name="salePrice"
                  touched={touched}
                  type="number"
                />
                <Input
                  errors={errors}
                  label="Order Minimum"
                  logo={clientAssetLogo}
                  name="saleOrderMin"
                  touched={touched}
                  type="number"
                />
                <Input
                  errors={errors}
                  label="Order Maximum"
                  logo={clientAssetLogo}
                  name="saleOrderMax"
                  touched={touched}
                  type="number"
                />
              </div>
            </S.FormBody>
            <ButtonContainer>
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Save Terms"
                type={ButtonType.submit}
              />
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default OfferModal;
