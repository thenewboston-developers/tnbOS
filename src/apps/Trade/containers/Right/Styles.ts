import styled from 'styled-components';

import UMainContent from './MainContent';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled(UMainContent)`
  flex: auto;
  overflow: auto;
`;
