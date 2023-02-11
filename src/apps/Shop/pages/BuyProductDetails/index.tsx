import {useDispatch} from 'react-redux';

import Button from 'apps/Shop/components/Button';
import Price from 'apps/Shop/components/Price';
import {useActiveBuyProduct} from 'apps/Shop/hooks';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const activeBuyProduct = useActiveBuyProduct();
  const dispatch = useDispatch<AppDispatch>();

  const handleBackClick = () => {
    dispatch(setActivePage(Page.buyHome));
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
        <S.Name>{activeBuyProduct.name || '-'}</S.Name>
        <S.Description>{activeBuyProduct.description || '-'}</S.Description>
        <S.PriceContainer>
          <Price product={activeBuyProduct} />
          <Button onClick={() => {}} text="Add to Cart" />
        </S.PriceContainer>
      </S.Right>
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
