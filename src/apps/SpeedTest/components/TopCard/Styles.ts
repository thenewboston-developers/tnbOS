import styled from 'styled-components';

import {colors, fonts} from 'apps/SpeedTest/styles';

export const Container = styled.div`
  background: ${colors.gunMetal};
  border-radius: 8px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px 14px;
`;

export const Content = styled.div`
  margin-top: 12px;
`;

export const Heading = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;
