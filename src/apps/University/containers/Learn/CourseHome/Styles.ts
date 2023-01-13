import styled from 'styled-components';

import UInstructor from 'apps/University/components/Instructor';
import UPlaylist from 'apps/University/components/Playlist';

export const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: auto 320px;
  padding: 16px 24px;
`;

export const CourseDescription = styled.div`
  margin-top: 24px;
`;

export const CourseName = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-top: 8px;
`;

export const Instructor = styled(UInstructor)`
  margin-top: 12px;
`;

export const Playlist = styled(UPlaylist)`
  margin-top: 48px;
`;

export const Thumbnail = styled.img`
  height: auto;
  width: 100%;
`;
