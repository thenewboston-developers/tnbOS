import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_LECTURES} from 'apps/University/store/constants';
import {Lecture, Lectures, PublicationStatus} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Lectures = {
  computergamedevelopmentL1: {
    courseId: 'computergamedevelopment',
    createdDate: '2022-12-22T00:45:10Z',
    description:
      'In this first lecture we learn about the history of games. In this first lecture we learn about the history of games. In this first lecture we learn about the history of games.',
    lectureId: 'computergamedevelopmentL1',
    name: 'The History of Computer Game Development',
    position: 1,
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/QkVxS3m.png',
    youtubeId: 'XCMWDfwUINA',
  },
  computergamedevelopmentL2: {
    courseId: 'computergamedevelopment',
    createdDate: '2022-12-22T00:45:10Z',
    description: 'In this second lecture we learn more about things.',
    lectureId: 'computergamedevelopmentL2',
    name: 'Second Computer Game Development Lecture',
    position: 2,
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/QkVxS3m.png',
    youtubeId: 'IcNtuCWkWpo',
  },
  mysqlL1: {
    courseId: 'mysql',
    createdDate: '2022-12-22T00:45:10Z',
    description: 'This is the first class in MySQL.',
    lectureId: 'mysqlL1',
    name: 'The History of MySQL',
    position: 1,
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/wdXAd3X.png',
    youtubeId: 'XCMWDfwUINA',
  },
  mysqlL2: {
    courseId: 'mysql',
    createdDate: '2022-12-22T00:45:10Z',
    description: 'In this second lecture we learn more about things.',
    lectureId: 'mysqlL2',
    name: 'Second MySQL Lecture',
    position: 2,
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/wdXAd3X.png',
    youtubeId: 'IcNtuCWkWpo',
  },
};

const lectures = createSlice({
  initialState,
  name: UNIVERSITY_LECTURES,
  reducers: {
    setLecture: (state: Lectures, {payload: lecture}: PayloadAction<Lecture>) => {
      const {lectureId} = lecture;
      state[lectureId] = lecture;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    setLectures: setLocalAndStateReducer<Lectures>(UNIVERSITY_LECTURES),
    unsetLecture: (state: Lectures, {payload: lectureId}: PayloadAction<string>) => {
      delete state[lectureId];
      const lectureList = Object.values(state);
      let position = 0;

      for (const lecture of lectureList) {
        state[lecture.lectureId].position = position;
        position += 1;
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
    updateLecturePositions: (state: Lectures, {payload}: PayloadAction<{lectureId: string; position: number}[]>) => {
      for (const item of payload) state[item.lectureId].position = item.position;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURES, state: current(state)});
    },
  },
});

export const {setLecture, setLectures, unsetLecture, updateLecturePositions} = lectures.actions;
export default lectures.reducer;
