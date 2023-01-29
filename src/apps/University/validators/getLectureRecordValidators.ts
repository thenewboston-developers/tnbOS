import {Courses, GetLectureRecordParams, PublicationStatus} from 'apps/University/types';
import {courseIdSchema} from 'apps/University/utils/yup';
import {Self} from 'system/types';
import yup from 'system/utils/yup';

export const getLectureRecordValidator: yup.SchemaOf<GetLectureRecordParams> = yup
  .object({
    courseId: courseIdSchema,
  })
  .noUnknown();

export const validateCourse = (courseId: string, courses: Courses, self: Self) => {
  const course = courses[courseId];
  if (!course) throw new Error('That course does not exist');
  if (course.instructor !== self.accountNumber) throw new Error('Block recipient is not instructor of that course');
  if (course.publicationStatus !== PublicationStatus.published) throw new Error('Course is not published');
};
