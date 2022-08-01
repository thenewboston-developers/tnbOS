import styled from 'styled-components';

import {colors} from 'system/styles';

export const Arrow = styled.img`
  height: 24px;
  margin: 4px 2px 0 0;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.gray['100']};
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
`;

export const FooterLeft = styled.div`
  font-size: 13px;
  margin-right: 26px;
`;

export const FooterRight = styled.div`
  display: flex;
`;

export const GettingStartedText = styled.div`
  font-size: 13px;
  margin: 0 auto 24px;
  text-align: center;
  width: 276px;
`;

export const Logo = styled.img`
  height: 24px;
`;
