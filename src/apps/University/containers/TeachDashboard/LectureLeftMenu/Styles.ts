import styled from 'styled-components';

import {mixinLeftMenu} from 'apps/University/styles';

export const Container = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 10%);
  ${mixinLeftMenu};
`;

export const Menu = styled.div`
  margin-top: 24px;
`;
