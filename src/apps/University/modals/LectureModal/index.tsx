import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {ButtonType} from 'apps/University/components/Button';
import {Input} from 'apps/University/components/FormElements';
import {useCourseLectures} from 'apps/University/hooks';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {setSelfLectureRecord} from 'apps/University/store/lectureRecords';
import {setLecture} from 'apps/University/store/lectures';
import {setActivePage, setActiveTeachLectureId} from 'apps/University/store/manager';
import {Lecture, Page, PublicationStatus} from 'apps/University/types';
import {generateNetworkUUID} from 'apps/University/utils/uuid';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayToast} from 'system/utils/toast';
import yup from 'system/utils/yup';
import * as S from './Styles';

interface LectureModalProps {
  close(): void;
}

const LectureModal: SFC<LectureModalProps> = ({className, close}) => {
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courseLectures = useCourseLectures(activeTeachCourseId);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    description: '',
    name: '',
    thumbnailUrl: '',
    youtubeId: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues) => {
    try {
      const courseId = activeTeachCourseId;
      const lectureId = generateNetworkUUID();
      const now = currentSystemDate();

      const lecture: Lecture = {
        courseId,
        createdDate: now,
        description: values.description,
        lectureId,
        modifiedDate: now,
        name: values.name,
        position: courseLectures.length,
        publicationStatus: PublicationStatus.draft,
        thumbnailUrl: values.thumbnailUrl,
        youtubeId: values.youtubeId,
      };

      dispatch(setLecture(lecture));
      dispatch(
        setSelfLectureRecord({
          courseId,
          lectureId,
          modifiedDate: now,
        }),
      );
      // TODO: dispatch(resetLectureRecordRecipients());
      dispatch(setActiveTeachLectureId(lectureId));
      dispatch(setActivePage(Page.teachCourseLectureDetails));
      displayToast('Lecture created!', ToastType.success);

      close();
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
      thumbnailUrl: yup.string().required(),
      youtubeId: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="New Lecture">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <Input errors={errors} label="Lecture Name" name="name" touched={touched} />
            <Input errors={errors} label="Description" name="description" touched={touched} />
            <Input errors={errors} label="Thumbnail URL" name="thumbnailUrl" touched={touched} />
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
        )}
      </Formik>
    </S.Modal>
  );
};

export default LectureModal;
