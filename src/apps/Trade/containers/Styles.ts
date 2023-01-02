import styled from 'styled-components';

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
