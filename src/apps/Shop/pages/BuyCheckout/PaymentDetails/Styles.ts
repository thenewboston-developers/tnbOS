import styled from 'styled-components';

import UButton from 'apps/Shop/components/Button';
import {colors} from 'apps/Shop/styles';

export const Amount = styled.div`
  font-size: 26px;
  font-weight: 700;
  margin-left: 8px;
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${colors.border.default};
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export const NetworkImage = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const PriceContainer = styled.div`
  align-items: center;
  display: flex;
  margin: 4px 0 12px;
`;
