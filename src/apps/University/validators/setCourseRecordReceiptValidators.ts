import yup from 'system/utils/yup';

export const setCourseRecordReceiptValidator = yup.object({
  recordModifiedDate: yup.date().required(),
});
