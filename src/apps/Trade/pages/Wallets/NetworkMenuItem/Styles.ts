import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';
import UNetworkLogo from 'system/components/NetworkLogo';
import {Status} from 'system/components/NetworkLogo/Styles';

export const Balance = styled.div`
  color: ${colors.palette.slateGray['300']};
  font-size: 12px;
`;

export const Container = styled.div<{isActive: boolean}>`
  align-items: flex-start;
  background: ${({isActive}) => (isActive ? colors.palette.lightGray['400'] : '#fff')};
  border-radius: 4px;
  display: flex;
  padding: 8px 12px;

  ${Status} {
    border-color: ${({isActive}) => (isActive ? colors.palette.lightGray['400'] : '#fff')};
  }

  &:hover {
    background: ${colors.palette.lightGray['400']};
    cursor: pointer;
  }
`;

export const DisplayName = styled.div`
  color: ${colors.palette.onyx['300']};
  font-size: 14px;
  font-weight: 600;
`;

export const NetworkId = styled.div`
  color: ${colors.palette.slateGray['300']};
  font-size: 12px;
`;

export const NetworkLogo = styled(UNetworkLogo)`
  margin-right: 10px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
