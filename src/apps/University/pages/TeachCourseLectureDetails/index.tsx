import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import {ButtonType} from 'apps/University/components/Button';
import {Input} from 'apps/University/components/FormElements';
import LecturePreview from 'apps/University/components/LecturePreview';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useActiveTeachLecture} from 'apps/University/hooks';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import * as S from './Styles';

const TeachCourseLectureDetails: SFC = ({className}) => {
  const activeTeachLecture = useActiveTeachLecture();

  const initialValues = {
    description: activeTeachLecture?.description || '',
    name: activeTeachLecture?.name || '',
    thumbnailUrl: activeTeachLecture?.thumbnailUrl || '',
    youtubeId: activeTeachLecture?.youtubeId || '',
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
    if (!activeTeachLecture) return null;
    const lecture = {...activeTeachLecture, ...values};
    return <LecturePreview lecture={lecture} />;
  };

  // TODO: Proper validation
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string(),
      name: yup.string(),
      thumbnailUrl: yup.string(),
      youtubeId: yup.string(),
    });
  }, []);

  return (
    <TeachDashboard>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched, values}) => (
          <S.Container className={className}>
            <S.Left>
              <Form>
                <Input errors={errors} label="Thumbnail URL" name="thumbnailUrl" touched={touched} />
                <Input errors={errors} label="Name" name="name" touched={touched} />
                <Input errors={errors} label="Description" name="description" touched={touched} />
                <Input errors={errors} label="YouTube ID" name="youtubeId" touched={touched} />
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
            <S.Right>{renderPreview(values)}</S.Right>
          </S.Container>
        )}
      </Formik>
    </TeachDashboard>
  );
};

export default TeachCourseLectureDetails;
