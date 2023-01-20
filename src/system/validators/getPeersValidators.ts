import {Dict, PeerOnlineStatus} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

const accountOnlineStatusValidator = yup.object({
  accountNumber: accountNumberSchema.required(),
  isOnline: yup.boolean().required(),
});

export const getPeersValidator = yup.object({
  correlation_id: yup.string().required(),
  return_value: yup
    .mixed()
    .required()
    .test(
      'all-online-statuses-valid',
      'All online statuses are not valid',
      async (return_value: Dict<PeerOnlineStatus>) => {
        for (const [key, value] of Object.entries(return_value)) {
          const accountOnlineStatus = {
            accountNumber: key,
            isOnline: value.is_online,
          };
          await accountOnlineStatusValidator.validate(accountOnlineStatus);
        }
        return true;
      },
    ),
});
