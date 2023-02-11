import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Shop/components/Button';
import {Input, Select} from 'apps/Shop/components/FormElements';
import {DEFAULT_SELECT_OPTION} from 'apps/Shop/constants/forms';
import {useActiveBuyAddress} from 'apps/Shop/hooks';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';
import yup from 'system/utils/yup';
import * as S from './Styles';

const BuyAddressDetails: SFC = ({className}) => {
  const activeBuyAddress = useActiveBuyAddress();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    address1: activeBuyAddress?.address1 || '',
    address2: activeBuyAddress?.address2 || '',
    city: activeBuyAddress?.city || '',
    country: activeBuyAddress?.country || '',
    fullName: activeBuyAddress?.fullName || '',
    state: activeBuyAddress?.state || '',
    zipCode: activeBuyAddress?.zipCode || '',
  };

  type FormValues = typeof initialValues;

  const handleBackClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleSubmit = (values: FormValues, {setSubmitting, setValues}: FormikHelpers<FormValues>) => {
    console.log(values);
    setSubmitting(false);
    setValues(values);
  };

  const renderSectionHeading = () => {
    const actionText = activeBuyAddress ? 'Edit' : 'Add';
    return <S.SectionHeading heading={`${actionText} Address`} />;
  };

  const validationSchema = useMemo(() => {
    return yup.object({
      address1: yup.string().required(),
      address2: yup.string().required(),
      city: yup.string().required(),
      country: yup
        .string()
        .required()
        .test('valid-country', 'Country is a required field', (country) => country !== DEFAULT_SELECT_OPTION),
      fullName: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
    });
  }, []);

  // TODO: Remove
  const options = [{value: DEFAULT_SELECT_OPTION}, {value: 'India'}, {value: 'USA'}];

  return (
    <S.Container className={className}>
      <S.Back onClick={handleBackClick}>Back to addresses</S.Back>
      {renderSectionHeading()}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Full Name" name="fullName" touched={touched} />
            <Input errors={errors} label="Address 1" name="address1" touched={touched} />
            <Input errors={errors} label="Address 2" name="address2" touched={touched} />
            <Input errors={errors} label="City" name="city" touched={touched} />
            <Input errors={errors} label="State" name="state" touched={touched} />
            <Input errors={errors} label="ZIP Code" name="zipCode" touched={touched} />
            <Select errors={errors} label="Country" name="country" options={options} touched={touched} />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default BuyAddressDetails;