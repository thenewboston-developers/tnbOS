import styled from 'styled-components';

import UIcon from 'system/components/Icon';

import {mixinListItemDescription, mixinListItemName} from 'apps/University/styles';

export const Container = styled.div`
  cursor: move;
  display: flex;
`;

export const Description = styled.div`
  ${mixinListItemDescription};
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Icon = styled(UIcon)`
  align-self: center;
  color: #ccc;
  flex-shrink: 0;
  margin-right: 2px;
`;

export const Name = styled.div`
  ${mixinListItemName};
  font-size: 13px;
`;
