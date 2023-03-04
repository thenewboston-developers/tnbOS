import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {getData} from 'country-list';
import {Form, Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/Shop/components/Button';
import {Input, Select} from 'apps/Shop/components/FormElements';
import {DEFAULT_SELECT_OPTION} from 'apps/Shop/constants/forms';
import {useActiveBuyAddress} from 'apps/Shop/hooks';
import {setAddress} from 'apps/Shop/store/addresses';
import {setActivePage} from 'apps/Shop/store/manager';
import {Address, Page} from 'apps/Shop/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

const BuyAddressDetails: SFC = ({className}) => {
  const activeBuyAddress = useActiveBuyAddress();
  const dispatch = useDispatch<AppDispatch>();

  const countryOptions = useMemo(() => {
    const options = getData().map((country) => ({displayName: country.name, value: country.code}));
    return [{value: DEFAULT_SELECT_OPTION}, ...options];
  }, []);

  const initialValues = {
    address1: activeBuyAddress?.address1 || '',
    address2: activeBuyAddress?.address2 || '',
    city: activeBuyAddress?.city || '',
    countryCode: activeBuyAddress?.countryCode || '',
    fullName: activeBuyAddress?.fullName || '',
    state: activeBuyAddress?.state || '',
    zipCode: activeBuyAddress?.zipCode || '',
  };

  type FormValues = typeof initialValues;

  const handleBackClick = () => {
    dispatch(setActivePage(Page.buyAddresses));
  };

  const handleSubmit = (values: FormValues, {setSubmitting, setValues}: FormikHelpers<FormValues>) => {
    const addressId = activeBuyAddress ? activeBuyAddress.addressId : crypto.randomUUID();

    const address: Address = {
      ...values,
      addressId,
    };

    dispatch(setAddress(address));

    setSubmitting(false);
    setValues(values);

    const actionText = activeBuyAddress ? 'updated' : 'added';
    displayToast(`Address ${actionText}!`, ToastType.success);

    dispatch(setActivePage(Page.buyAddresses));
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
      countryCode: yup
        .string()
        .required()
        .test('valid-country', 'Country is a required field', (countryCode) => countryCode !== DEFAULT_SELECT_OPTION),
      fullName: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <S.InnerContainer>
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
              <Select errors={errors} label="Country" name="countryCode" options={countryOptions} touched={touched} />
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
      </S.InnerContainer>
    </S.Container>
  );
};

export default BuyAddressDetails;
