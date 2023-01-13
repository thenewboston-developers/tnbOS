import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_COURSES} from 'apps/University/store/constants';
import {Course, Courses} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Courses = {
  abc123: {
    courseId: 'abc123',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'MySQL for Beginners',
    thumbnailUrl: 'https://i.imgur.com/R9jxXUj.png',
  },
  abc456: {
    courseId: 'abc456',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'Ruby',
    thumbnailUrl: 'https://i.imgur.com/4o8GWdj.png',
  },
  def123: {
    courseId: 'def123',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'Objective C',
    thumbnailUrl: 'https://i.imgur.com/PSjlER4.png',
  },
  def456: {
    courseId: 'def456',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'Computer Game Development',
    thumbnailUrl: 'https://i.imgur.com/QkVxS3m.png',
  },
};

const courses = createSlice({
  initialState,
  name: UNIVERSITY_COURSES,
  reducers: {
    setCourse: (state: Courses, {payload: course}: PayloadAction<Course>) => {
      const {courseId} = course;
      state[courseId] = course;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_COURSES, state: current(state)});
    },
    setCourses: setLocalAndStateReducer<Courses>(UNIVERSITY_COURSES),
  },
});

export const {setCourse, setCourses} = courses.actions;
export default courses.reducer;
