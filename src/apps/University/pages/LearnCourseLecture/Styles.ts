import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: auto auto;
  padding: 24px;
`;

// TODO: Unify with LecturePreview/Styles
export const Description = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 13px;
  margin-top: 4px;
`;

export const Left = styled.div``;

// TODO: Unify with LecturePreview/Styles
export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
`;

export const Right = styled.div``;
