import yup, {accountNumberSchema} from 'system/utils/yup';

export const networkUUIDSchema = (testName: string, testMessage: string) =>
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
