import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_LECTURES} from 'apps/University/store/constants';
import {Lecture, Lectures, PublicationStatus} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Lectures = {
  computergamedevelopmentL1: {
    courseId: 'computergamedevelopment',
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
  },
});

export const {setLecture, setLectures} = lectures.actions;
export default lectures.reducer;
