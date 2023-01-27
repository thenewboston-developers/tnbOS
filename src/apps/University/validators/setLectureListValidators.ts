import {Lecture, PublicationStatus} from 'apps/University/types';
import {courseIdSchema, lectureIdSchema} from 'apps/University/utils/yup';
import yup from 'system/utils/yup';

interface ILecture extends Omit<Lecture, 'createdDate' | 'modifiedDate'> {
  createdDate: Date;
  modifiedDate: Date;
}

const lectureValidator: yup.SchemaOf<ILecture> = yup.object({
  courseId: courseIdSchema,
  createdDate: yup.date().required(),
  description: yup.string().required(),
  lectureId: lectureIdSchema,
  modifiedDate: yup.date().required(),
  name: yup.string().required(),
  position: yup.number().required().integer().min(0),
  publicationStatus: yup
    .mixed()
    .test(
      'publication-status-is-published',
      'Publication status must be set to published',
      (publicationStatus: any) => publicationStatus === PublicationStatus.published,
    ),
  thumbnailUrl: yup.string().required(),
  youtubeId: yup.string().required(),
});

export const setLectureListValidator = yup.array().of(lectureValidator).required();

export const validateLectureIdsAccountNumber = (blockSender: string, lectureList: Lecture[]) => {
  for (const lecture of lectureList) {
    const accountNumber = lecture.lectureId.substring(0, 64);
    if (accountNumber !== blockSender) throw new Error('Lecture ID account number must match block sender');
  }
};
