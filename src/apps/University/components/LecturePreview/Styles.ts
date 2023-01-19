import styled from 'styled-components';

import {mixinLectureDescription, mixinLectureName} from 'apps/University/styles';

export const Container = styled.div``;

export const Description = styled.div`
  ${mixinLectureDescription};
`;

export const Img = styled.img`
  border-radius: 4px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 4%);
  height: auto;
  width: 100%;
`;

export const Name = styled.div`
  ${mixinLectureName};
`;
