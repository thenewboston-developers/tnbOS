import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors, fonts} from 'apps/SpeedTest/styles';

const cellStyling = `
  border-bottom: 1px solid #32394e;
  padding: 8px 12px;
`;

const edgePadding = `
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const Container = styled.div`
  margin-top: 48px;
  width: 100%;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0 4px 0;
`;

export const History = styled.span`
  color: ${colors.fonts.bright};
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
`;

export const Icon = styled(UMdiIcon)`
  border-radius: 50%;
  color: ${colors.slateGray};
  margin-left: 8px;
  transition: all 0.15s;

  &:hover {
    background: ${colors.icon.hoverBackground};
    color: ${colors.icon.hoverColor};
    cursor: pointer;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  width: 100%;
`;

export const Td = styled.td`
  ${cellStyling}
  ${edgePadding}
`;

export const Th = styled.th`
  font-weight: ${fonts.weight.bold};
  text-align: left;

  ${cellStyling}
  ${edgePadding}
`;
