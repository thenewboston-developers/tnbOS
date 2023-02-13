import {useDispatch} from 'react-redux';

import ProductCard from 'apps/Shop/components/ProductCard';
import ProductCardsContainer from 'apps/Shop/components/ProductCardsContainer';
import {useAvailableProducts} from 'apps/Shop/hooks';
import {setActiveBuyProductId, setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC} from 'system/types';

import BuyHomeEmptyStateGraphic from './assets/buy-home-empty-state.png';
import * as S from './Styles';

const BuyHome: SFC = ({className}) => {
  const availableProducts = useAvailableProducts();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (productId: string) => {
    dispatch(setActiveBuyProductId(productId));
    dispatch(setActivePage(Page.buyProductDetails));
  };

  const renderPageContent = () => {
    if (!!availableProducts.length) {
      return <ProductCardsContainer>{renderProductCards()}</ProductCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Products from connected accounts will appear here."
        graphic={BuyHomeEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderProductCards = () => {
    return availableProducts.map((product) => (
      <ProductCard key={product.productId} onClick={() => handleClick(product.productId)} product={product} />
    ));
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default BuyHome;
