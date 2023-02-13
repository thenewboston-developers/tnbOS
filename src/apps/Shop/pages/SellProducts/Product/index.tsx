import {useDispatch} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import ActivationBadge from 'apps/Shop/components/ActivationBadge';
import {setActivePage, setActiveSellProductId} from 'apps/Shop/store/manager';
import {setSelfProductRecord, unsetProductRecord} from 'apps/Shop/store/productRecords';
import {setProduct, unsetProduct} from 'apps/Shop/store/products';
import {ActivationStatus, Page, Product as TProduct} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface ProductProps {
  product: TProduct;
}

const Product: SFC<ProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {activationStatus, description, imageUrl, name, productId} = product;

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
      // TODO: Reset product record recipients
    } else if (newActivationStatus === ActivationStatus.draft) {
      dispatch(unsetProductRecord({productId, seller}));
      // TODO: Reset product record recipients
    }

    displayToast(`Product set to ${newActivationStatus}`, ToastType.success);
  };

  const handleDeleteClick = () => {
    dispatch(unsetProduct(productId));
    dispatch(unsetProductRecord({productId, seller: product.seller}));
    // TODO: Reset product record recipients
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
      <S.Details>
        <S.Name onClick={handleEditClick}>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
      </S.Details>
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
