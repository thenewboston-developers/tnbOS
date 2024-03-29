import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Button from 'apps/Shop/components/Button';
import Price from 'apps/Shop/components/Price';
import {useActiveBuyProduct, useCartPriceNetwork, useCartSeller} from 'apps/Shop/hooks';
import CartWarningModal from 'apps/Shop/modals/CartWarningModal';
import {getCartProducts} from 'apps/Shop/selectors/state';
import {setCartProduct, unsetCartProduct} from 'apps/Shop/store/cartProducts';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {useToggle} from 'system/hooks';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const [cartWarningModalIsOpen, toggleCartWarningModal] = useToggle(false);
  const activeBuyProduct = useActiveBuyProduct();
  const cartPriceNetwork = useCartPriceNetwork();
  const cartProducts = useSelector(getCartProducts);
  const cartSeller = useCartSeller();
  const dispatch = useDispatch<AppDispatch>();

  const isInCart = useMemo(() => {
    if (!activeBuyProduct) return false;
    return !!cartProducts[activeBuyProduct.productId];
  }, [activeBuyProduct, cartProducts]);

  const handleAddToCartClick = () => {
    if (!activeBuyProduct) return;

    if (!!cartPriceNetwork && cartPriceNetwork !== activeBuyProduct.priceNetwork) {
      toggleCartWarningModal();
      return;
    }

    if (!!cartSeller && cartSeller !== activeBuyProduct.seller) {
      toggleCartWarningModal();
      return;
    }

    dispatch(
      setCartProduct({
        createdDate: currentSystemDate(),
        productId: activeBuyProduct.productId,
      }),
    );

    displayToast(`Product added to cart!`, ToastType.success);
  };

  const handleBackClick = () => {
    dispatch(setActivePage(Page.buyHome));
  };

  const handleRemoveFromCartClick = () => {
    if (!activeBuyProduct) return;
    dispatch(unsetCartProduct(activeBuyProduct.productId));
    displayToast(`Product removed from cart`, ToastType.success);
  };

  const renderCartButton = () => {
    if (isInCart) return <Button onClick={handleRemoveFromCartClick} text="Remove from Cart" />;
    return <Button onClick={handleAddToCartClick} text="Add to Cart" />;
  };

  const renderCartWarningModal = () => {
    if (!activeBuyProduct || !cartWarningModalIsOpen) return null;
    return <CartWarningModal close={toggleCartWarningModal} />;
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.Img alt="Product image" src={activeBuyProduct?.imageUrl} />
      </S.Left>
    );
  };

  const renderRight = () => {
    if (!activeBuyProduct) return null;
    return (
      <S.Right>
        <S.Name>{activeBuyProduct.name}</S.Name>
        <S.Description>{activeBuyProduct.description}</S.Description>
        <S.AccountLabel label="Seller" accountNumber={activeBuyProduct.seller} />
        <S.PriceContainer>
          <Price product={activeBuyProduct} />
          {renderCartButton()}
        </S.PriceContainer>
      </S.Right>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Back onClick={handleBackClick}>Back to products</S.Back>
        <S.MainContent>
          {renderLeft()}
          {renderRight()}
        </S.MainContent>
      </S.Container>
      {renderCartWarningModal()}
    </>
  );
};

export default BuyProductDetails;
