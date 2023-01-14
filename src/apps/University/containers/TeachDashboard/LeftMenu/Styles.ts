import styled from 'styled-components';

import {mixinLeftMenu} from 'apps/University/styles';

export const Container = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 10%);
  ${mixinLeftMenu};
`;

export const CourseName = styled.div`
  font-weight: 400;
  margin-top: 2px;
`;

export const CourseNameContainer = styled.div`
  font-size: 12px;
  padding: 8px 20px 0;
`;

export const CourseNameLabel = styled.div`
  font-weight: 600;
`;

export const Menu = styled.div`
  margin-top: 24px;
`;

export const Thumbnail = styled.img`
  border-radius: 4px;
  height: auto;
  width: 100%;
`;

export const ThumbnailContainer = styled.div`
  padding: 24px 20px 0;
`;
