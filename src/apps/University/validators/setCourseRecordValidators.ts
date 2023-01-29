import yup from 'system/utils/yup';

export const setCourseRecordValidator = yup
  .object({
    courseModifiedDates: yup.object().required(),
    recordModifiedDate: yup.date().required(),
  })
  .noUnknown();
