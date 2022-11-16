import {setRun} from 'apps/SpeedTest/store/runs';
import {RunStatus} from 'apps/SpeedTest/types';
import {
  pongValidator,
  validateNetworkId,
  validateRunExists,
  validateRunRecipient,
  validateRunStatus,
} from 'apps/SpeedTest/validators/pongValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';

const pongListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender} = block;
      const {params} = payload;
      const {
        speedTest: {runs},
      } = store.getState();

      await pongValidator.validate(params);

      const run = runs[params.runId];

      validateRunExists(run);
      validateNetworkId(networkId, run.networkId);
      validateRunRecipient(sender, run.recipient);
      validateRunStatus(run);

      dispatch(
        setRun({
          ...run,
          responseDate: currentSystemDate(),
          runId: params.runId,
          status: RunStatus.success,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default pongListener;
