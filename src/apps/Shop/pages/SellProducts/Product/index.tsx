import {useDispatch} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import ActivationBadge from 'apps/Shop/components/ActivationBadge';
import {setActivePage, setActiveSellProductId} from 'apps/Shop/store/manager';
import {unsetProduct} from 'apps/Shop/store/products';
import {Page, Product as TProduct} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {truncate} from 'system/utils/strings';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface ProductProps {
  product: TProduct;
}

const Product: SFC<ProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {activationStatus, description, imageUrl, name, productId} = product;

  const handleDeleteProductClick = () => {
    dispatch(unsetProduct(productId));
    displayToast(`Product deleted`, ToastType.success);
  };

  const handleEditProductClick = () => {
    dispatch(setActiveSellProductId(productId));
    dispatch(setActivePage(Page.sellProductDetails));
  };

  return (
    <>
      <S.Thumbnail onClick={handleEditProductClick} thumbnailUrl={imageUrl} />
      <S.Details>
        <S.Name onClick={handleEditProductClick}>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
      </S.Details>
      <S.ActivationStatus>
        <ActivationBadge activationStatus={activationStatus} />
      </S.ActivationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditProductClick}>Edit</ActionLink>
        <ActionLink onClick={handleDeleteProductClick}>Delete</ActionLink>
      </S.Actions>
    </>
  );
};

export default Product;
