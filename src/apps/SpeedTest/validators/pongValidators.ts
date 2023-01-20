import {Run, RunStatus} from 'apps/SpeedTest/types';
import yup from 'system/utils/yup';

export const pongValidator = yup.object({
  runId: yup.string().required().uuid(),
});

export const validateNetworkId = (blockNetworkId: string, runNetworkId: string) => {
  if (blockNetworkId !== runNetworkId) throw new Error('Block network ID does not match run network ID');
};

export const validateRunExists = (run: Run) => {
  if (!run) throw new Error('Run with that ID does not exist');
};

export const validateRunRecipient = (blockSender: string, runRecipient: string) => {
  if (blockSender !== runRecipient) throw new Error('Block sender does not match run recipient');
};

export const validateRunStatus = (run: Run) => {
  if (run.status !== RunStatus.pending) throw new Error('Run is no longer pending');
};
