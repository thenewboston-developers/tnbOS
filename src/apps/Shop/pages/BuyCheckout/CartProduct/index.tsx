import {useDispatch} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import Thumbnail from 'apps/Shop/components/Thumbnail';
import ProductListDetails from 'apps/Shop/components/ProductListDetails';
import {unsetCartProduct} from 'apps/Shop/store/cartProducts';
import {Product} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface CartProductProps {
  product: Product;
}

const CartProduct: SFC<CartProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {imageUrl, productId} = product;

  const handleRemoveClick = () => {
    dispatch(unsetCartProduct(productId));
    displayToast(`Product removed`, ToastType.success);
  };

  return (
    <>
      <Thumbnail thumbnailUrl={imageUrl} />
      <ProductListDetails product={product} />
      <S.Actions>
        <ActionLink onClick={handleRemoveClick}>Remove</ActionLink>
      </S.Actions>
    </>
  );
};

export default CartProduct;
