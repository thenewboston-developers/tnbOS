import {useDispatch} from 'react-redux';

import {useActiveBuyProduct} from 'apps/Shop/hooks';
import {resetCartProducts, setCartProduct} from 'apps/Shop/store/cartProducts';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface CartWarningModalProps {
  close(): void;
}

const CartWarningModal: SFC<CartWarningModalProps> = ({className, close}) => {
  const activeBuyProduct = useActiveBuyProduct()!;
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = () => {
    dispatch(resetCartProducts());
    dispatch(
      setCartProduct({
        createdDate: currentSystemDate(),
        productId: activeBuyProduct.productId,
      }),
    );
    displayToast(`Product added to cart!`, ToastType.success);
    close();
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <S.Text>
        This product has a different seller and/or price network than the existing item(s) in your cart. Would you like
        to create a new order?
      </S.Text>
      <S.Button onClick={handleButtonClick} text="Yes" />
    </S.Modal>
  );
};

export default CartWarningModal;
