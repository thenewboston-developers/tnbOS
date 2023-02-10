import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {ButtonType} from 'apps/Shop/components/Button';
import {Input} from 'apps/Shop/components/FormElements';
import {setProduct} from 'apps/Shop/store/products';
import {setActivePage, setActiveSellProductId} from 'apps/Shop/store/manager';
import {ActivationStatus, Page, Product} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import {generateNetworkUUID} from 'system/utils/uuid';
import yup from 'system/utils/yup';
import * as S from './Styles';

interface ProductModalProps {
  close(): void;
}

const ProductModal: SFC<ProductModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    description: '',
    imageUrl: '',
    name: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues) => {
    const now = currentSystemDate();
    const productId = generateNetworkUUID();

    const product: Product = {
      activationStatus: ActivationStatus.draft,
      createdDate: now,
      description: values.description,
      imageUrl: values.imageUrl,
      modifiedDate: now,
      name: values.name,
      productId,
      seller: self.accountNumber,
    };

    dispatch(setProduct(product));
    dispatch(setActiveSellProductId(productId));
    dispatch(setActivePage(Page.sellProductDetails));
    displayToast('Product created!', ToastType.success);

    close();
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      imageUrl: yup.string().url().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="New Product">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Product Name" name="name" touched={touched} />
            <Input errors={errors} label="Description" name="description" touched={touched} />
            <Input errors={errors} label="Image URL" name="imageUrl" touched={touched} />
            <S.Button
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
    </S.Modal>
  );
};

export default ProductModal;
