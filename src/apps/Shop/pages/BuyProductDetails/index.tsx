import {useDispatch, useSelector} from 'react-redux';

import ActionLink from 'apps/Shop/components/ActionLink';
import Button from 'apps/Shop/components/Button';
import Price from 'apps/Shop/components/Price';
import {useActiveBuyProduct} from 'apps/Shop/hooks';
import {setActivePage, setActiveSellProductId} from 'apps/Shop/store/manager';
import {unsetProduct} from 'apps/Shop/store/products';
import {Page} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const activeBuyProduct = useActiveBuyProduct();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleBackClick = () => {
    dispatch(setActivePage(Page.buyHome));
  };

  const handleDeleteClick = () => {
    if (!activeBuyProduct) return;
    dispatch(setActivePage(Page.buyHome));
    dispatch(unsetProduct(activeBuyProduct.productId));
    displayToast(`Product deleted`, ToastType.success);
  };

  const handleEditClick = () => {
    if (!activeBuyProduct) return;
    dispatch(setActiveSellProductId(activeBuyProduct.productId));
    dispatch(setActivePage(Page.sellProductDetails));
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.Img alt="Product image" src={activeBuyProduct?.imageUrl} />
        {renderSellerMenu()}
      </S.Left>
    );
  };

  const renderRight = () => {
    if (!activeBuyProduct) return null;
    return (
      <S.Right>
        <S.Name>{activeBuyProduct.name || '-'}</S.Name>
        <S.Description>{activeBuyProduct.description || '-'}</S.Description>
        <S.PriceContainer>
          <Price product={activeBuyProduct} />
          <Button onClick={() => {}} text="Add to Cart" />
        </S.PriceContainer>
      </S.Right>
    );
  };

  const renderSellerMenu = () => {
    if (self.accountNumber !== activeBuyProduct?.seller) return null;
    return (
      <S.SellerMenu>
        <ActionLink onClick={handleEditClick}>Edit</ActionLink>
        <ActionLink onClick={handleDeleteClick}>Delete</ActionLink>
      </S.SellerMenu>
    );
  };

  return (
    <S.Container className={className}>
      <S.Back onClick={handleBackClick}>Back to products</S.Back>
      <S.MainContent>
        {renderLeft()}
        {renderRight()}
      </S.MainContent>
    </S.Container>
  );
};

export default BuyProductDetails;
