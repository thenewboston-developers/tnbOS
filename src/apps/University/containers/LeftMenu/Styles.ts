import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  background: #303641;
  color: ${colors.fonts.leftMenu};
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: auto;
`;

export const MenuTitle = styled.div`
  color: ${colors.fonts.leftMenu};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-top: 12px;
  padding: 12px 20px;
`;
