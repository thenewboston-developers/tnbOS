import {useSelector} from 'react-redux';

import ProductCard from 'apps/Shop/components/ProductCard';
import ProductCardsContainer from 'apps/Shop/components/ProductCardsContainer';
import {getProducts} from 'apps/Shop/selectors/state';
import EmptyPage from 'system/components/EmptyPage';
import {SFC} from 'system/types';

import BuyHomeEmptyStateGraphic from './assets/buy-home-empty-state.png';
import * as S from './Styles';

const BuyHome: SFC = ({className}) => {
  const products = useSelector(getProducts);

  // TODO: Update this logic
  const availableProducts = Object.values(products);

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
      <ProductCard key={product.productId} onClick={() => {}} product={product} />
    ));
  };

  return <S.Container className={className}>{renderPageContent()}</S.Container>;
};

export default BuyHome;
