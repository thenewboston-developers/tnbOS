import {Product} from 'apps/Shop/types';

import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PriceProps {
  product: Product;
}

const Price: SFC<PriceProps> = ({className, product}) => {
  const networkDisplayImage = useNetworkDisplayImage(product.priceNetwork);

  return (
    <S.Container className={className}>
      <S.NetworkImage alt="display image" src={networkDisplayImage} />
      <S.Amount>{product.priceAmount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default Price;
