import styled from 'styled-components';

import {colors} from 'apps/Chat/styles';

export const Amount = styled.span`
  color: ${colors.palette.gray['100']};
  font-size: 13px;
  font-weight: 500;
  margin-right: 6px;
`;

export const Container = styled.div`
  display: inline-block;
  margin-top: 2px;
`;

export const FlexContainer = styled.div`
  align-items: center;
  background: ${colors.leftBackground};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  padding: 4px 6px;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 14px;
  width: 14px;
`;
