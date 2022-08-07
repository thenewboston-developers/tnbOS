import styled from 'styled-components';

import {colors, fonts} from 'system/styles';

export const AccountNumber = styled.div`
  color: ${colors.palette.gray['500']};
  margin-right: 16px;
  overflow-wrap: anywhere;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const CopyContainer = styled.div`
  align-items: center;
  background: ${colors.palette.neutral['075']};
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  margin-top: 40px;
  padding: 8px;
  width: 280px;
`;

export const CopyText = styled.div`
  cursor: pointer;
  font-weight: ${fonts.weight.bold};
`;
