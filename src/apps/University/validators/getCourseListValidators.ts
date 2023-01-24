import {Courses, PublicationStatus} from 'apps/University/types';
import {Self} from 'system/types';

export const validateCoursesIds = (courseIds: string[], courses: Courses, self: Self) => {
  for (const courseId of courseIds) {
    const course = courses[courseId];
    if (!course) throw new Error('Course does not exist');
    if (course.instructor !== self.accountNumber) throw new Error('Self is not the instructor for requested course');
    if (course.publicationStatus !== PublicationStatus.published) throw new Error('Course is not published');
  }
};
