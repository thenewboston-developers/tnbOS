import styled from 'styled-components';

import {colors} from 'apps/Shop/styles';

export const Container = styled.div`
  background: ${colors.canvas.subtle};
  border-bottom: 1px solid ${colors.border.default};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 12px 24px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.div`
  color: ${colors.fonts.subtle};
  font-size: 11px;
`;

export const DetailValue = styled.div`
  font-size: 13px;
  margin-top: 4px;
`;

export const PriceAmount = styled.div`
  font-weight: 700;
  margin-left: 6px;
`;

export const PriceContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const PriceNetworkImage = styled.img`
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;
