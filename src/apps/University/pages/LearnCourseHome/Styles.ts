import styled from 'styled-components';

import UButton from 'apps/University/components/Button';
import UInstructor from 'apps/University/components/Instructor';
import UPlaylist from 'apps/University/components/Playlist';

export const Button = styled(UButton)`
  margin-top: 16px;
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: auto 360px;
  padding: 24px;
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

export const Left = styled.div``;

export const Playlist = styled(UPlaylist)`
  margin-top: 48px;
`;

export const Right = styled.div``;

export const Thumbnail = styled.img`
  border-radius: 8px;
  height: auto;
  width: 100%;
`;
