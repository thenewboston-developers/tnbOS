import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';
import noop from 'lodash/noop';

import {ButtonType} from 'apps/University/components/Button';
import CourseCard from 'apps/University/components/CourseCard';
import {Checkbox, Input} from 'apps/University/components/FormElements';
import PublicationBadge from 'apps/University/components/PublicationBadge';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useActiveTeachCourse} from 'apps/University/hooks';
import {resetCourseRecordRecipients} from 'apps/University/store/courseRecordRecipients';
import {setSelfCourseRecord, unsetCourseRecord} from 'apps/University/store/courseRecords';
import {setCourse} from 'apps/University/store/courses';
import {PublicationStatus} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

const TeachCourseDetails: SFC = ({className}) => {
  const activeTeachCourse = useActiveTeachCourse();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    description: activeTeachCourse?.description || '',
    name: activeTeachCourse?.name || '',
    publicationStatus: activeTeachCourse?.publicationStatus === PublicationStatus.published,
    thumbnailUrl: activeTeachCourse?.thumbnailUrl || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues, {setSubmitting, setValues}: FormikHelpers<FormValues>) => {
    if (!activeTeachCourse) return;

    const publicationStatus = values.publicationStatus ? PublicationStatus.published : PublicationStatus.draft;

    const course = {
      ...activeTeachCourse,
      ...values,
      modifiedDate: currentSystemDate(),
      publicationStatus,
    };

    dispatch(setCourse(course));

    const {courseId, instructor, modifiedDate} = course;

    if (publicationStatus === PublicationStatus.published) {
      dispatch(setSelfCourseRecord({courseId, instructor, modifiedDate}));
      dispatch(resetCourseRecordRecipients());
    } else if (
      activeTeachCourse?.publicationStatus === PublicationStatus.published &&
      publicationStatus === PublicationStatus.draft
    ) {
      dispatch(unsetCourseRecord({courseId, instructor}));
      dispatch(resetCourseRecordRecipients());
    }

    setSubmitting(false);
    setValues(values);

    displayToast('Course updated!', ToastType.success);
  };

  const renderPreview = (values: FormValues) => {
    if (!activeTeachCourse) return null;

    const publicationStatus = values.publicationStatus ? PublicationStatus.published : PublicationStatus.draft;
    const course = {...activeTeachCourse, ...values, publicationStatus};

    return (
      <>
        <S.PublicationStatus>
          <PublicationBadge publicationStatus={publicationStatus} />
        </S.PublicationStatus>
        <CourseCard course={course} onClick={noop} />
      </>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
      publicationStatus: yup.boolean().required(),
      thumbnailUrl: yup.string().url().required(),
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
                <Input errors={errors} label="Course Name" name="name" touched={touched} />
                <Input errors={errors} label="Description" name="description" touched={touched} />
                <Input errors={errors} label="Thumbnail URL" name="thumbnailUrl" touched={touched} />
                <Checkbox errors={errors} label="Publish Course" name="publicationStatus" touched={touched} />
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

export default TeachCourseDetails;
