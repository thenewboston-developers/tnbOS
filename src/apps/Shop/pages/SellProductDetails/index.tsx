import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';
import noop from 'lodash/noop';

import ActivationBadge from 'apps/Shop/components/ActivationBadge';
import {ButtonType} from 'apps/Shop/components/Button';
import {Checkbox, Input} from 'apps/Shop/components/FormElements';
import ProductCard from 'apps/Shop/components/ProductCard';
import {useActiveSellProduct} from 'apps/Shop/hooks';
import {setActivePage} from 'apps/Shop/store/manager';
import {setProduct} from 'apps/Shop/store/products';
import {ActivationStatus, Page} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

const SellProductDetails: SFC = ({className}) => {
  const activeSellProduct = useActiveSellProduct();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    activationStatus: activeSellProduct?.activationStatus === ActivationStatus.active,
    description: activeSellProduct?.description || '',
    imageUrl: activeSellProduct?.imageUrl || '',
    name: activeSellProduct?.name || '',
  };

  type FormValues = typeof initialValues;

  const handleBackClick = () => {
    dispatch(setActivePage(Page.sellProducts));
  };

  const handleSubmit = (values: FormValues, {setSubmitting, setValues}: FormikHelpers<FormValues>) => {
    if (!activeSellProduct) return;

    const activationStatus = values.activationStatus ? ActivationStatus.active : ActivationStatus.draft;

    const product = {
      ...activeSellProduct,
      ...values,
      activationStatus,
      modifiedDate: currentSystemDate(),
    };

    dispatch(setProduct(product));

    setSubmitting(false);
    setValues(values);

    displayToast('Product updated!', ToastType.success);
  };

  const renderPreview = (values: FormValues) => {
    if (!activeSellProduct) return null;

    const activationStatus = values.activationStatus ? ActivationStatus.active : ActivationStatus.draft;
    const product = {...activeSellProduct, ...values, activationStatus};

    return (
      <>
        <S.ActivationStatus>
          <ActivationBadge activationStatus={activationStatus} />
        </S.ActivationStatus>
        <ProductCard onClick={noop} product={product} />
      </>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      activationStatus: yup.boolean().required(),
      description: yup.string().required(),
      imageUrl: yup.string().url().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <>
      <S.Back onClick={handleBackClick}>Back to products</S.Back>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched, values}) => (
          <S.Container className={className}>
            <S.Left>
              <Form>
                <Input errors={errors} label="Product Name" name="name" touched={touched} />
                <Input errors={errors} label="Description" name="description" touched={touched} />
                <Input errors={errors} label="Image URL" name="imageUrl" touched={touched} />
                <Checkbox errors={errors} label="Activate Product" name="activationStatus" touched={touched} />
                <S.Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text="Submit"
                  type={ButtonType.submit}
                />
              </Form>
            </S.Left>
            <S.Right>{renderPreview(values)}</S.Right>
          </S.Container>
        )}
      </Formik>
    </>
  );
};

export default SellProductDetails;
