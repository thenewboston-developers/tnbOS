import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  background: #fff;
  color: ${colors.fonts.default};
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  flex: auto;
  overflow: auto;
`;
