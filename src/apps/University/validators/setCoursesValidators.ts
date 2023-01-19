import {Course, PublicationStatus} from 'apps/University/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const courseValidator = yup.object({
  courseId: yup.string().required().uuid(),
  createdDate: yup.date().required(),
  description: yup.string().required(),
  instructor: accountNumberSchema.required(),
  name: yup.string().required(),
  publicationStatus: yup
    .string()
    .required()
    .test(
      'publication-status-is-published',
      'Publication status must be set to published',
      (publicationStatus: any) => publicationStatus === PublicationStatus.published,
    ),
  thumbnailUrl: yup.string().required(),
});

export const setCoursesValidator = yup.array().of(courseValidator).required();

export const validateInstructors = (blockSender: string, courses: Course[]) => {
  if (courses.length === 0) return;
  const instructors = courses.map(({instructor}) => instructor);
  const instructorSet = new Set(instructors);
  if (instructorSet.size !== 1) throw new Error('Instructors for all courses must match');
  const [instructor] = instructorSet;
  if (instructor !== blockSender) throw new Error('Instructor for all courses must match block sender');
};
