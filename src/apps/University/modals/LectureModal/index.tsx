import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {ButtonType} from 'apps/University/components/Button';
import {Input} from 'apps/University/components/FormElements';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {setLecture} from 'apps/University/store/lectures';
import {setActivePage, setActiveTeachLectureId} from 'apps/University/store/manager';
import {Lecture, Page, PublicationStatus} from 'apps/University/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

interface LectureModalProps {
  close(): void;
}

const LectureModal: SFC<LectureModalProps> = ({className, close}) => {
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    description: '',
    name: '',
    thumbnailUrl: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues) => {
    try {
      const lectureId = crypto.randomUUID();

      const lecture: Lecture = {
        courseId: activeTeachCourseId,
        createdDate: currentSystemDate(),
        description: values.description,
        lectureId,
        name: values.name,
        position: 1, // TODO: Fix
        publicationStatus: PublicationStatus.draft,
        thumbnailUrl: values.thumbnailUrl,
        youtubeId: 'gyMwXuJrbJQ',
      };

      dispatch(setLecture(lecture));
      dispatch(setActiveTeachLectureId(lectureId));
      dispatch(setActivePage(Page.teachCourseLectureDetails));
      displayToast('Lecture created!', ToastType.success);

      close();
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Proper validation
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
      thumbnailUrl: yup.string().required(),
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
        )}
      </Formik>
    </S.Modal>
  );
};

export default LectureModal;
