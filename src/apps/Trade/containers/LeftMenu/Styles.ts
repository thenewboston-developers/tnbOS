import styled from 'styled-components';

import UMenuContent from 'apps/Trade/containers/LeftMenu/MenuContent';

export const Container = styled.div`
  background: #2a3042;
  color: #79829c;
  display: flex;
  flex-direction: column;
`;

export const MenuContent = styled(UMenuContent)`
  flex: auto;
  overflow: auto;
`;
