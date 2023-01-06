import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import UAmount from 'apps/Trade/components/Amount';
import UAssetLogo from 'apps/Trade/components/AssetLogo';
import Badge from 'apps/Trade/components/Badge';
import Card from 'apps/Trade/components/Card';
import UUser from 'apps/Trade/components/User';

export const Amount = styled(UAmount)`
  flex-basis: 20%;
`;

export const AssetLogo = styled(UAssetLogo)`
  align-items: flex-start;
  flex-basis: 20%;
`;

export const BadgeContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 120px;
`;

export const Container = styled(Card)`
  margin-bottom: 12px;
  padding: 0;
`;

export const Date = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MdiIcon = styled(UMdiIcon)<{$expanded: boolean}>`
  transform: scaleY(${({$expanded}) => ($expanded ? -1 : 1)});
  transition: transform 0.3s;
`;

export const ResolutionBadge = styled(Badge)`
  margin-bottom: 4px;
`;

export const Time = styled.div`
  color: #74788d;
  font-size: 12px;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 12px;

  &:hover {
    background: #fcfcfc;
    cursor: pointer;
  }
`;

export const User = styled(UUser)`
  align-items: flex-start;
  flex-basis: 20%;
`;
