import ProductListDetails from 'apps/Shop/components/ProductListDetails';
import Thumbnail from 'apps/Shop/components/Thumbnail';
import {Product} from 'apps/Shop/types';
import {SFC} from 'system/types';

export interface OrderProductProps {
  product: Product;
}

const OrderProduct: SFC<OrderProductProps> = ({product}) => {
  return (
    <>
      <Thumbnail thumbnailUrl={product.imageUrl} />
      <ProductListDetails product={product} />
    </>
  );
};

export default OrderProduct;
