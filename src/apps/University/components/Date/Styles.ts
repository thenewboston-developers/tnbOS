import styled from 'styled-components';
import MdiIcon from '@mdi/react';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  display: flex;
`;

export const Date = styled.div`
  color: ${colors.fonts.default};
  font-size: 13px;
  font-weight: 600;
  margin-top: 2px;
`;

export const Icon = styled(MdiIcon)`
  color: ${colors.fonts.secondary};
  margin-right: 8px;
`;

export const Label = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
`;

export const Right = styled.div``;
