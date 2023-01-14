import {useMemo} from 'react';
import {Form, Formik} from 'formik';
import noop from 'lodash/noop';

import {ButtonType} from 'apps/University/components/Button';
import CourseCard from 'apps/University/components/CourseCard';
import {Input} from 'apps/University/components/FormElements';
import Dashboard from 'apps/University/containers/Dashboard';
import {useActiveTeachCourse} from 'apps/University/hooks';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

const TeachCourseDetails: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();

  const initialValues = {
    description: activeTeachCourse?.description || '',
    name: activeTeachCourse?.name || '',
    thumbnailUrl: activeTeachCourse?.thumbnailUrl || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreview = (values: FormValues) => {
    if (!activeTeachCourse) return null;
    const course = {...activeTeachCourse, ...values};
    return <CourseCard course={course} onClick={noop} />;
  };

  const renderRight = (values: FormValues) => {
    return (
      <S.Right>
        <S.SectionHeading heading="Preview" />
        {renderPreview(values)}
      </S.Right>
    );
  };

  // TODO: Proper validation
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string(),
      name: yup.string(),
      thumbnailUrl: yup.string(),
    });
  }, []);

  return (
    <Dashboard>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched, values}) => (
          <S.Container className={className}>
            <S.Left>
              <S.SectionHeading heading="Course Details" />
              <Form>
                <Input errors={errors} label="Thumbnail URL" name="thumbnailUrl" touched={touched} />
                <Input errors={errors} label="Name" name="name" touched={touched} />
                <Input errors={errors} label="Description" name="description" touched={touched} />
                <S.Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text="Submit"
                  type={ButtonType.submit}
                />
              </Form>
            </S.Left>
            {renderRight(values)}
          </S.Container>
        )}
      </Formik>
    </Dashboard>
  );
};

export default TeachCourseDetails;
