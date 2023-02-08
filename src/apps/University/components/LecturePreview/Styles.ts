import styled from 'styled-components';

import UThumbnail from 'apps/University/components/Thumbnail';
import {mixinLectureDescription, mixinLectureName} from 'apps/University/styles';

export const Container = styled.div``;

export const Description = styled.div`
  ${mixinLectureDescription};
`;

export const Name = styled.div`
  ${mixinLectureName};
`;

export const Thumbnail = styled(UThumbnail)`
  box-shadow: 0 2px 2px rgb(0 0 0 / 4%);
`;
