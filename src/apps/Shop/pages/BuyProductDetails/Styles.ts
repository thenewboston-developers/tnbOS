import styled from 'styled-components';

import UAccountLabel from 'apps/Shop/components/AccountLabel';
import UBack from 'apps/Shop/components/Back';
import {colors} from 'apps/Shop/styles';

export const AccountLabel = styled(UAccountLabel)`
  margin-top: 16px;
`;

export const Back = styled(UBack)`
  margin-bottom: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
`;

export const Description = styled.div`
  color: ${colors.fonts.muted};
  margin-top: 16px;
`;

export const Img = styled.img`
  border-radius: 4px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
`;

export const MainContent = styled.div`
  display: flex;
  gap: 24px;
`;

export const Name = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
`;

export const PriceContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${colors.border.default};
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: 16px;
  padding: 8px;
`;

export const Right = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
`;

export const SellerMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;
