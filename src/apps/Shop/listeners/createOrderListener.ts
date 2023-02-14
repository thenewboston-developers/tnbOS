import {Order} from 'apps/Shop/types';
import {
  createOrderValidator,
  validateApprovalExpirationDateIsCorrectValue,
} from 'apps/Shop/validators/createOrderValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const createOrderListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await createOrderValidator.validate(params);
      const order: Order = params;
      const {approvalExpirationDate, createdDate} = order;

      validateApprovalExpirationDateIsCorrectValue(approvalExpirationDate, createdDate);

      console.log(blockSender);
      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default createOrderListener;
