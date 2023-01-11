import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {TransactionStatus} from 'apps/Trade/types';

const receivedMixin = css`
  color: #34c38f;
`;

const sentMixin = css`
  color: #74788d;
`;

export const BottomText = styled.div`
  color: #74788d;
  font-size: 12px;
  font-weight: 300;
`;

export const Container = styled.div`
  border-bottom: 1px solid #eff2f7;
`;

export const Details = styled.div`
  flex: auto;
  margin-right: 24px;
`;

export const DetailsTopText = styled.div`
  color: #343a40;
  font-size: 14px;
  font-weight: 600;
`;

export const ExpandedDetails = styled.div`
  padding: 12px 0 20px;
`;

export const Icon = styled(UIcon)`
  margin-right: 12px;
`;

export const Top = styled.div`
  align-items: center;
  border-radius: 4px;
  display: flex;
  padding: 8px;

  &:hover {
    background: #f6f6f6;
    cursor: pointer;
  }
`;

export const Value = styled.div<{transactionStatus: TransactionStatus}>`
  font-weight: 500;

  ${({transactionStatus}) => {
    if (transactionStatus === TransactionStatus.received) return receivedMixin;
    if (transactionStatus === TransactionStatus.sent) return sentMixin;
    return;
  }}
`;

export const ValueContainer = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;
