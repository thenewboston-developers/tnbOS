import Thumbnail from 'apps/Shop/components/Thumbnail';
import {Product} from 'apps/Shop/types';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface OrderProductProps {
  product: Product;
}

const OrderProduct: SFC<OrderProductProps> = ({product}) => {
  const {description, imageUrl, name} = product;

  return (
    <>
      <Thumbnail thumbnailUrl={imageUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        <S.Description>{truncate(description, 200)}</S.Description>
        <S.PriceMini product={product} />
      </S.Details>
    </>
  );
};

export default OrderProduct;
