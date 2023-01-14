import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_COURSES} from 'apps/University/store/constants';
import {Course, Courses, PublicationStatus} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Courses = {
  computergamedevelopment: {
    courseId: 'computergamedevelopment',
    createdDate: '2022-12-22T00:45:10Z',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0',
    name: 'Computer Game Development',
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/QkVxS3m.png',
  },
  mysql: {
    courseId: 'mysql',
    createdDate: '2022-12-23T00:45:10Z',
    description:
      'Cow doner chislic turducken. Leberkas buffalo porchetta shoulder pork loin, biltong jowl kielbasa prosciutto beef hamburger pig shankle cow frankfurter. Buffalo leberkas venison shankle prosciutto, beef ribs tenderloin ham.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'MySQL for Beginners',
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/R9jxXUj.png',
  },
  objectivec: {
    courseId: 'objectivec',
    createdDate: '2022-12-24T00:45:10Z',
    description: 'Hamburger pastrami meatball drumstick brisket shoulder, boudin andouille.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'Objective C Cow doner chislic turducken Cow doner chislic turducken Cow doner chislic turducken',
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/PSjlER4.png',
  },
  ruby: {
    courseId: 'ruby',
    createdDate: '2022-12-25T00:45:10Z',
    description:
      'Strip steak brisket beef, corned beef capicola sausage boudin. Pancetta filet mignon landjaeger pork loin, bacon rump ball tip hamburger shankle. Burgdoggen ham doner biltong landjaeger kevin. Pork belly tenderloin bresaola ham hock, jowl spare ribs flank meatloaf boudin corned beef.',
    instructor: 'f48a59446bc4397a4887b1d8654b013ad152006d9977da721667542f8e19a38c',
    name: 'Ruby',
    publicationStatus: PublicationStatus.published,
    thumbnailUrl: 'https://i.imgur.com/4o8GWdj.png',
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
