import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const queuedBlockPayloadSchema = yup.object({
  artworkId: yup.string().required(),
  blockId: yup.string().required(),
  modifiedDate: yup.date().required(),
  owner: accountNumberSchema.required(),
});

export const queuedBlockValidator = yup.object({
  payload: queuedBlockPayloadSchema.required(),
  signature: yup.string().required(),
});
