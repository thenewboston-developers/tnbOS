import styled from 'styled-components';

import ULeftMenu from 'apps/Trade/containers/LeftMenu';
import URight from 'apps/Trade/containers/Right';
import {fonts} from 'apps/Trade/styles';

export const Container = styled.div`
  color: #495057;
  display: grid;
  font-family: ${fonts.family.default};
  font-weight: ${fonts.weight.regular};
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
