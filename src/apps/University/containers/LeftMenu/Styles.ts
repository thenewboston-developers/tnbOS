import styled from 'styled-components';

import {mixinLeftMenu} from 'apps/University/styles';

export const Container = styled.div`
  ${mixinLeftMenu};
`;

export const Logo = styled.img`
  height: auto;
  width: 100%;
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 32px 42px 8px;
`;
