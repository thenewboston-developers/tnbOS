import {Product} from 'apps/Shop/types';
import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ProductCardProps {
  onClick: GenericVoidFunction;
  product: Product;
}

const ProductCard: SFC<ProductCardProps> = ({className, onClick, product}) => {
  const networkDisplayImage = useNetworkDisplayImage(product.priceNetwork);

  const renderPrice = () => {
    return (
      <S.Price>
        <S.PriceNetworkImage alt="display image" src={networkDisplayImage} />
        <S.PriceAmount>{product.priceAmount.toLocaleString()}</S.PriceAmount>
      </S.Price>
    );
  };

  return (
    <S.Container className={className} onClick={onClick}>
      <S.Thumbnail thumbnailUrl={product.imageUrl} />
      <S.Bottom>
        <S.Name>{product.name}</S.Name>
        <S.Description>{product.description}</S.Description>
        <S.AccountLabel label="Seller" accountNumber={product.seller} />
        <S.Line />
        {renderPrice()}
      </S.Bottom>
    </S.Container>
  );
};

export default ProductCard;
