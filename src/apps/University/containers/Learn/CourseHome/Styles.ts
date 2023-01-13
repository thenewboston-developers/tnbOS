import styled from 'styled-components';

import UInstructor from 'apps/University/components/Instructor';

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 320px;
  padding: 12px;
`;

export const Instructor = styled(UInstructor)`
  margin-top: 12px;
`;

export const LectureDescription = styled.div`
  margin-top: 16px;
`;

export const LectureTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-top: 12px;
`;

export const Thumbnail = styled.img`
  height: auto;
  width: 100%;
`;
