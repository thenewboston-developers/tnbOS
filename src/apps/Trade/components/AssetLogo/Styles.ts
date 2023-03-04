import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

export const BottomText = styled.div`
  color: ${colors.palette.slateGray['300']};
  font-size: 12px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 36px;
  margin-right: 8px;
  width: 36px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopText = styled.div`
  color: ${colors.palette.onyx['300']};
  font-size: 14px;
  font-weight: 600;
`;
