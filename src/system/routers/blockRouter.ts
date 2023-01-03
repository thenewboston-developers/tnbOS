import {appRouters} from 'apps/registry';
import store from 'system/store';
import {setNetworkBlock} from 'system/store/networkBlocks';
import {AppDispatch, SocketDataStandard} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';
import {blockValidator} from 'system/validators/blockValidators';
import {validateIsSelfAccountNumber} from 'system/validators/common';

const blockRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      const {message: block} = await blockValidator.validate(socketData);
      validateIsSelfAccountNumber(block.recipient, self);
      const {payload} = block;
      const pid = payload?.pid;

      if (pid) {
        const appRouter = appRouters[pid];
        appRouter(block, dispatch, networkId);
      }

      store.dispatch(
        setNetworkBlock({
          networkBlock: {
            ...block,
            date: currentSystemDate(),
          },
          networkId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default blockRouter;
