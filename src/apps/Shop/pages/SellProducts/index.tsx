import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import EmptyText from 'apps/Shop/components/EmptyText';
import {SFC} from 'system/types';

import Product from './Product';
import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const renderAddProductButton = () => {
    return <Button iconLeft={mdiPlus} onClick={() => {}} text="Add" />;
  };

  const renderContent = () => {
    if (!![1, 2, 3].length) return renderProducts();
    return <EmptyText>No products to display.</EmptyText>;
  };

  const renderProducts = () => {
    return (
      <S.Products>
        <Product />
        <Product />
      </S.Products>
    );
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Products" rightContent={renderAddProductButton()} />
      {renderContent()}
    </S.Container>
  );
};

export default SellProducts;
