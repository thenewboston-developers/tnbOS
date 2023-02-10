import {useSelector} from 'react-redux';
import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import EmptyText from 'apps/Shop/components/EmptyText';
import ProductModal from 'apps/Shop/modals/ProductModal';
import {getProducts} from 'apps/Shop/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Product from './Product';
import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const [productModalIsOpen, toggleProductModal] = useToggle(false);
  const products = useSelector(getProducts);

  const renderAddProductButton = () => {
    return <Button iconLeft={mdiPlus} onClick={toggleProductModal} text="Add" />;
  };

  const renderContent = () => {
    if (!![1, 2, 3].length) return renderProducts();
    return <EmptyText>No products to display.</EmptyText>;
  };

  const renderProducts = () => {
    const _products = Object.values(products).map((product) => <Product key={product.productId} product={product} />);
    return <S.Products>{_products}</S.Products>;
  };

  const renderProductModal = () => {
    if (!productModalIsOpen) return null;
    return <ProductModal close={toggleProductModal} />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.SectionHeading heading="Products" rightContent={renderAddProductButton()} />
        {renderContent()}
      </S.Container>
      {renderProductModal()}
    </>
  );
};

export default SellProducts;
