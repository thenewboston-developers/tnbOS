import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import {ButtonType} from 'apps/University/components/Button';
import {Checkbox, Input} from 'apps/University/components/FormElements';
import LecturePreview from 'apps/University/components/LecturePreview';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useActiveTeachLecture} from 'apps/University/hooks';
import {setLecture} from 'apps/University/store/lectures';
import {PublicationStatus} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

const TeachCourseLectureDetails: SFC = ({className}) => {
  const activeTeachLecture = useActiveTeachLecture();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    description: activeTeachLecture?.description || '',
    name: activeTeachLecture?.name || '',
    publicationStatus: activeTeachLecture?.publicationStatus === PublicationStatus.published,
    thumbnailUrl: activeTeachLecture?.thumbnailUrl || '',
    youtubeId: activeTeachLecture?.youtubeId || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
    if (!activeTeachLecture) return;

    try {
      const publicationStatus = values.publicationStatus ? PublicationStatus.published : PublicationStatus.draft;
      const lecture = {...activeTeachLecture, ...values, publicationStatus};

      dispatch(setLecture(lecture));
      setSubmitting(false);

      displayToast('Lecture updated!', ToastType.success);
    } catch (error) {
      console.error(error);
    }
  };

  const renderPreview = (values: FormValues) => {
    if (!activeTeachLecture) return null;

    const publicationStatus = values.publicationStatus ? PublicationStatus.published : PublicationStatus.draft;
    const lecture = {...activeTeachLecture, ...values, publicationStatus};

    return (
      <>
        <S.PublicationStatus>
          <PublicationBadge publicationStatus={publicationStatus} />
        </S.PublicationStatus>
        <LecturePreview lecture={lecture} />
      </>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
      publicationStatus: yup.boolean().required(),
      thumbnailUrl: yup.string().required(),
      youtubeId: yup.string().required(),
    });
  }, []);

  return (
    <TeachDashboard>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched, values}) => (
          <S.Container className={className}>
            <S.Left>
              <Form>
                <Input errors={errors} label="Lecture Name" name="name" touched={touched} />
                <Input errors={errors} label="Description" name="description" touched={touched} />
                <Input errors={errors} label="Thumbnail URL" name="thumbnailUrl" touched={touched} />
                <Input errors={errors} label="YouTube ID" name="youtubeId" touched={touched} />
                <Checkbox errors={errors} label="Publish Lecture" name="publicationStatus" touched={touched} />
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
