import {useDispatch} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import Thumbnail from 'apps/Shop/components/Thumbnail';
import {unsetCartProduct} from 'apps/Shop/store/cartProducts';
import {Product} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {truncate} from 'system/utils/strings';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface CartProductProps {
  product: Product;
}

const CartProduct: SFC<CartProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, imageUrl, name, productId} = product;

  const handleRemoveClick = () => {
    dispatch(unsetCartProduct(productId));
    displayToast(`Product removed`, ToastType.success);
  };

  return (
    <>
      <Thumbnail thumbnailUrl={imageUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
        <S.PriceMini product={product} />
      </S.Details>
      <S.Actions>
        <ActionLink onClick={handleRemoveClick}>Remove</ActionLink>
      </S.Actions>
    </>
  );
};

export default CartProduct;
