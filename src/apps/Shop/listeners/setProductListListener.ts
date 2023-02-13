import {setProductList} from 'apps/Shop/store/products';
import {Product} from 'apps/Shop/types';
import {setProductListValidator, validateSellers} from 'apps/Shop/validators/setProductListValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setProductListListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setProductListValidator.validate(params);
      const productList: Product[] = params;

      validateSellers(blockSender, productList);

      dispatch(setProductList(productList));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setProductListListener;
