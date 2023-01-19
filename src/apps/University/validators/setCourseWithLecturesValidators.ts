import {Course, Lecture, PublicationStatus} from 'apps/University/types';
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

const lectureValidator = yup.object({
  courseId: yup.string().required().uuid(),
  createdDate: yup.date().required(),
  description: yup.string().required(),
  lectureId: yup.string().required().uuid(),
  name: yup.string().required(),
  position: yup.number().required().integer().min(0),
  publicationStatus: yup
    .string()
    .required()
    .test(
      'publication-status-is-published',
      'Publication status must be set to published',
      (publicationStatus: any) => publicationStatus === PublicationStatus.published,
    ),
  thumbnailUrl: yup.string().required(),
  youtubeId: yup.string().required(),
});

export const setCourseWithLecturesValidator = yup.object({
  course: courseValidator.required(),
  lectures: yup.array().of(lectureValidator).required(),
});

export const validateInstructor = (blockSender: string, course: Course) => {
  if (blockSender !== course.instructor) throw new Error('Block sender must match course instructor');
};

export const validateLectureCourseIds = (course: Course, lectures: Lecture[]) => {
  if (lectures.length === 0) return;
  const courseIds = lectures.map(({courseId}) => courseId);
  const courseIdSet = new Set(courseIds);
  if (courseIdSet.size !== 1) throw new Error('Course IDs for all lectures must match');
  const [courseId] = courseIdSet;
  if (courseId !== course.courseId) throw new Error('Course ID for all lectures must match the parent courses ID');
};

export const validateLecturePositions = (lectures: Lecture[]) => {
  [...Array(lectures.length)].forEach((lecture, index) => {
    console.log(lecture.name);
    console.log(index);
  });
};
