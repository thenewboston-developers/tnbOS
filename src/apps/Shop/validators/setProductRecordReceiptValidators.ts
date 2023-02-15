import yup from 'system/utils/yup';

export const setProductRecordReceiptValidator = yup
  .object({
    recordModifiedDate: yup.date().required(),
  })
  .noUnknown();
