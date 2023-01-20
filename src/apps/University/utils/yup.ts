import yup, {accountNumberSchema} from 'system/utils/yup';

const networkUUIDSchema = (testName: string, testMessage: string) =>
  yup
    .string()
    .required()
    .test(testName, testMessage, async (id: any) => {
      const accountNumber = id.substring(0, 64);
      const uuid = id.substring(65);
      const isAccountNumberValid = await accountNumberSchema.required().isValid(accountNumber);
      const isUUIDValid = await yup.string().required().uuid().isValid(uuid);
      return isAccountNumberValid && isUUIDValid;
    });

export const courseIdSchema = networkUUIDSchema(
  'course-id-is-correct-format',
  'Course ID must follow the correct format of [accountNumber]-[uuid]',
);

export const lectureIdSchema = networkUUIDSchema(
  'lecture-id-is-correct-format',
  'Lecture ID must follow the correct format of [accountNumber]-[uuid]',
);
