import * as yup from 'yup';

export const accountNumberSchema = yup
  .string()
  .length(64, 'Account number must be 64 characters long')
  .matches(/^[0-9a-fA-F]+$/, 'Invalid account number');

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

function callbackWithRef(ref: any, cb: (thisValue: any, refValue: any) => boolean, message: string) {
  return yup.number().test({
    exclusive: false,
    message,
    name: 'callbackWithRef',
    test(value: any) {
      if (!value) return true;
      return cb(value, this.resolve(ref));
    },
  });
}

// https://github.com/jaredpalmer/formik/issues/90
function equalTo(ref: any, message?: string) {
  return yup.string().test({
    exclusive: false,
    message: message || `Must be the same as ${ref.path}`,
    name: 'equalTo',
    test(value: any) {
      if (!value) return true;
      return value === this.resolve(ref);
    },
  });
}

function notEqualTo(ref: any, message?: string) {
  return yup.string().test({
    exclusive: false,
    message: message || `Can not be the same as ${ref.path}`,
    name: 'notEqualTo',
    test(value: any) {
      if (!value) return true;
      return value !== this.resolve(ref);
    },
  });
}

yup.addMethod(yup.number, 'callbackWithRef', callbackWithRef);
yup.addMethod(yup.string, 'equalTo', equalTo);
yup.addMethod(yup.string, 'notEqualTo', notEqualTo);

export default yup;
