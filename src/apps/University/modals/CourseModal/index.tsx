import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import {ButtonType} from 'apps/University/components/Button';
import {Input} from 'apps/University/components/FormElements';
import {setCourse} from 'apps/University/store/courses';
import {setActivePage, setActiveTeachCourseId} from 'apps/University/store/manager';
import {Course, Page, PublicationStatus} from 'apps/University/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

interface CourseModalProps {
  close(): void;
}

const CourseModal: SFC<CourseModalProps> = ({className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    description: '',
    name: '',
    thumbnailUrl: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = (values: FormValues) => {
    try {
      const courseId = crypto.randomUUID();

      const course: Course = {
        courseId,
        createdDate: currentSystemDate(),
        description: values.description,
        instructor: self.accountNumber,
        name: values.name,
        publicationStatus: PublicationStatus.draft,
        thumbnailUrl: values.thumbnailUrl,
      };

      dispatch(setCourse(course));
      dispatch(setActiveTeachCourseId(courseId));
      dispatch(setActivePage(Page.teachCourseDetails));
      displayToast('Course created!', ToastType.success);

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
    <S.Modal className={className} close={close} header="New Course">
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

export default CourseModal;
