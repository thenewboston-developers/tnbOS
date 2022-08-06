import styled from 'styled-components';

import UNetworkLogo from 'apps/NetworkManager/components/NetworkLogo';

export const Container = styled.div`
  border-radius: 3px;
  border: 1px solid #e3e8ee;
  display: flex;
  justify-content: space-between;
  padding: 8px 2px 8px 10px;
`;

export const DisplayName = styled.div`
  font-size: 12px;
`;

export const Domain = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`;

export const Left = styled.div`
  display: flex;
`;

export const LeftText = styled.div``;

export const NetworkLogo = styled(UNetworkLogo)`
  margin-right: 10px;
`;

export const Right = styled.div``;
