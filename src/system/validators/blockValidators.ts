import {appRouters} from 'apps/registry';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';
import {verifyBlockSignature} from 'system/utils/tnb';

const blockSchema = yup
  .object({
    amount: yup.number().required().integer().min(0),
    id: yup.string().required().uuid(),
    payload: yup
      .mixed()
      .test('is-valid-json', 'Invalid payload', (payload) => {
        try {
          const jsonString = JSON.stringify(payload);
          JSON.parse(jsonString);
          return true;
        } catch (error) {
          return false;
        }
      })
      .test('is-valid-pid', 'Invalid pid', (payload) => {
        if (!payload?.pid) return true;
        return Object.keys(appRouters).includes(payload.pid);
      }),
    recipient: accountNumberSchema.required(),
    sender: accountNumberSchema.required(),
    signature: yup.string().required(),
    transaction_fee: yup.number().required().integer().min(0),
  })
  .test('is-signature-valid', 'Invalid signature', (block) => verifyBlockSignature(block));

export const blockValidator = yup.object({
  message: blockSchema.required(),
});
