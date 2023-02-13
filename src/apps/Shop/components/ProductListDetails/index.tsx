import {Product} from 'apps/Shop/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface ProductListDetailsProps {
  onClick?: GenericVoidFunction;
  product: Product;
}

const ProductListDetails: SFC<ProductListDetailsProps> = ({className, onClick, product}) => {
  return (
    <S.Container className={className}>
      <S.Name onClick={onClick}>{product.name}</S.Name>
      <S.Description>{truncate(product.description, 200)}</S.Description>
      <S.PriceMini product={product} />
    </S.Container>
  );
};

export default ProductListDetails;
