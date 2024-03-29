import {useDispatch} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import ActivationBadge from 'apps/Shop/components/ActivationBadge';
import ProductListDetails from 'apps/Shop/components/ProductListDetails';
import {setActivePage, setActiveSellProductId} from 'apps/Shop/store/manager';
import {resetProductRecordRecipients} from 'apps/Shop/store/productRecordRecipients';
import {setSelfProductRecord, unsetProductRecord} from 'apps/Shop/store/productRecords';
import {setProduct, unsetProduct} from 'apps/Shop/store/products';
import {ActivationStatus, Page, Product as TProduct} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface ProductProps {
  product: TProduct;
}

const Product: SFC<ProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {activationStatus, imageUrl, productId} = product;

  const handleActivationActionLinkClick = () => {
    let newActivationStatus = ActivationStatus.draft;

    if (activationStatus === ActivationStatus.draft) newActivationStatus = ActivationStatus.active;

    const _product = {
      ...product,
      activationStatus: newActivationStatus,
      modifiedDate: currentSystemDate(),
    };

    dispatch(setProduct(_product));

    const {modifiedDate, seller} = _product;

    if (newActivationStatus === ActivationStatus.active) {
      dispatch(setSelfProductRecord({modifiedDate, productId, seller}));
      dispatch(resetProductRecordRecipients());
    } else if (newActivationStatus === ActivationStatus.draft) {
      dispatch(unsetProductRecord({productId, seller}));
      dispatch(resetProductRecordRecipients());
    }

    displayToast(`Product set to ${newActivationStatus}`, ToastType.success);
  };

  const handleDeleteClick = () => {
    dispatch(unsetProduct(productId));
    dispatch(unsetProductRecord({productId, seller: product.seller}));
    dispatch(resetProductRecordRecipients());
    displayToast(`Product deleted`, ToastType.success);
  };

  const handleEditClick = () => {
    dispatch(setActiveSellProductId(productId));
    dispatch(setActivePage(Page.sellProductDetails));
  };

  const renderActivationActionLink = () => {
    const actionText = activationStatus === ActivationStatus.draft ? 'Activate' : 'Deactivate';
    return <ActionLink onClick={handleActivationActionLinkClick}>{actionText}</ActionLink>;
  };

  return (
    <>
      <S.Thumbnail onClick={handleEditClick} thumbnailUrl={imageUrl} />
      <ProductListDetails onClick={handleEditClick} product={product} />
      <S.ActivationStatus>
        <ActivationBadge activationStatus={activationStatus} />
      </S.ActivationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditClick}>Edit</ActionLink>
        <ActionLink onClick={handleDeleteClick}>Delete</ActionLink>
        {renderActivationActionLink()}
      </S.Actions>
    </>
  );
};

export default Product;
