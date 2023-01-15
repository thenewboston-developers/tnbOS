import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div``;

export const Description = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 13px;
  margin-top: 4px;
`;

export const Img = styled.img`
  border-radius: 4px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 4%);
  height: auto;
  width: 100%;
`;

export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
`;
