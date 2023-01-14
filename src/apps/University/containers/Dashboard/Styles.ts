import styled from 'styled-components';

import ULeftMenu from './LeftMenu';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  height: 100%;
  overflow-y: hidden;
`;

export const LeftMenu = styled(ULeftMenu)`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
