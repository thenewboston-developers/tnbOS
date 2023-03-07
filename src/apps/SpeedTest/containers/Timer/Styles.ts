import styled from 'styled-components';

import {colors, fonts} from 'apps/SpeedTest/styles';

export const BottomText = styled.div`
  color: ${colors.fonts.default};
  font-size: 12px;
  margin-top: 2px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const TopText = styled.div`
  color: ${colors.fonts.bright};
  font-size: 30px;
  font-weight: ${fonts.weight.light};
`;
