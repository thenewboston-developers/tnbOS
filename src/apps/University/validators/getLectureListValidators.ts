import {Courses, Lectures, PublicationStatus} from 'apps/University/types';
import {Self} from 'system/types';

export const validateLectureIds = (courses: Courses, lectureIds: string[], lectures: Lectures, self: Self) => {
  for (const lectureId of lectureIds) {
    const lecture = lectures[lectureId];
    if (!lecture) throw new Error('Lecture does not exist');

    const course = courses[lecture.courseId];
    if (!course) throw new Error('Course does not exist');

    if (course.instructor !== self.accountNumber) throw new Error('Self is not the instructor for requested course');
    if (course.publicationStatus !== PublicationStatus.published) throw new Error('Course is not published');
    if (lecture.publicationStatus !== PublicationStatus.published) throw new Error('Lecture is not published');
  }
};
