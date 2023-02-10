import {Product} from 'apps/Shop/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ProductCardProps {
  onClick: GenericVoidFunction;
  product: Product;
}

const ProductCard: SFC<ProductCardProps> = ({className, onClick, product}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Thumbnail thumbnailUrl={product.imageUrl} />
      <S.Bottom>
        <S.Name>{product.name}</S.Name>
        <S.Description>{product.description}</S.Description>
      </S.Bottom>
    </S.Container>
  );
};

export default ProductCard;
