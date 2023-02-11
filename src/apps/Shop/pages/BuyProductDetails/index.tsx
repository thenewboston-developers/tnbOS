import {useActiveBuyProduct} from 'apps/Shop/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const activeBuyProduct = useActiveBuyProduct();

  return <S.Container className={className}>{activeBuyProduct?.productId}</S.Container>;
};

export default BuyProductDetails;
