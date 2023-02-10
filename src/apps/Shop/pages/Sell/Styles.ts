import styled from 'styled-components';

import ULeftMenu from 'apps/Shop/pages/Sell/LeftMenu';
import URight from 'apps/Shop/pages/Sell/Right';

export const Container = styled.div`
  color: #495057;
  display: grid;
  grid-template-columns: 250px auto;
  height: 100%;
  width: 100%;
`;

export const LeftMenu = styled(ULeftMenu)`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Right = styled(URight)`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
