import styled from 'styled-components';

import {mixinLectureDescription, mixinLectureName} from 'apps/University/styles';

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: auto auto;
  padding: 24px;

  @media (max-width: 1280px) {
    grid-template-columns: auto;
  }
`;

export const Description = styled.div`
  ${mixinLectureDescription};
`;

export const IFrame = styled.iframe`
  aspect-ratio: 16 / 9;
  border: none;
  left: 0;
  top: 0;
  width: 100%;
`;

export const LectureContainer = styled.div``;

export const Name = styled.div`
  ${mixinLectureName};
`;

export const PlaylistContainer = styled.div``;
