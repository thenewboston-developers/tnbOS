import yup from 'system/utils/yup';

export const setProductRecordValidator = yup
  .object({
    productModifiedDates: yup.object().required(),
    recordModifiedDate: yup.date().required(),
  })
  .noUnknown();
