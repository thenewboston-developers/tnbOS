import styled from 'styled-components';

import UAccountIdentification from 'apps/SpeedTest/components/AccountIdentification';
import UNetworkIdentification from 'apps/SpeedTest/components/NetworkIdentification';
import {colors, fonts} from 'apps/SpeedTest/styles';

export const AccountIdentification = styled(UAccountIdentification)`
  margin-right: 10px;
`;

export const Button = styled.button`
  background: transparent;
  border: 1px solid ${colors.slateGray};
  border-radius: 4px;
  color: ${colors.fonts.secondary};
  font-family: ${fonts.family.default};
  padding: 8px 12px;
  transition: all 0.15s;
  width: 100%;

  &:hover {
    background: rgba(166, 176, 207, 0.2);
    color: #fff;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  width: 100%;

  @media (min-width: 900px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const NetworkIdentification = styled(UNetworkIdentification)`
  margin-right: 10px;
`;
