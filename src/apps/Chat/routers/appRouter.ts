import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  console.log(block);
  console.log(dispatch);
  console.log(networkId);
};

export default appRouter;
