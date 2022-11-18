import styled from 'styled-components';

import {fonts} from 'apps/SpeedTest/styles';

export const BottomText = styled.div`
  color: #a6b0cf;
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
  color: #f6f6f6;
  font-size: 30px;
  font-weight: ${fonts.weight.light};
`;
