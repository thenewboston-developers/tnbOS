import {Course, PublicationStatus} from 'apps/University/types';
import {courseIdSchema} from 'apps/University/utils/yup';
import yup, {accountNumberSchema} from 'system/utils/yup';

const courseValidator = yup.object({
  courseId: courseIdSchema,
  createdDate: yup.date().required(),
  description: yup.string().required(),
  instructor: accountNumberSchema.required(),
  modifiedDate: yup.date().required(),
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

export const setCourseListValidator = yup.array().of(courseValidator).required();

export const validateInstructors = (blockSender: string, courseList: Course[]) => {
  if (courseList.length === 0) return;
  const instructors = courseList.map(({instructor}) => instructor);
  const instructorSet = new Set(instructors);
  if (instructorSet.size !== 1) throw new Error('Instructors for all courses must match');
  const [instructor] = instructorSet;
  if (blockSender !== instructor) throw new Error('Instructor for all courses must match the block sender');
};
