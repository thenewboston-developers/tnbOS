import styled from 'styled-components';

import {mixinLectureDescription, mixinLectureName} from 'apps/University/styles';

export const Container = styled.div``;

export const Description = styled.div`
  ${mixinLectureDescription};
`;

export const Img = styled.img`
  box-shadow: 0 2px 2px rgb(0 0 0 / 4%);
  height: auto;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

export const ImgContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
`;

export const Name = styled.div`
  ${mixinLectureName};
`;
