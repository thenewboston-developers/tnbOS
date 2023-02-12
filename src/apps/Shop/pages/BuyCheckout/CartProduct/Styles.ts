import styled from 'styled-components';

import UPriceMini from 'apps/Shop/components/PriceMini';
import {mixinListItemDescription, mixinListItemName} from 'apps/Shop/styles';

export const Actions = styled.div`
  font-size: 13px;
  text-align: end;
  white-space: nowrap;
`;

export const Description = styled.div`
  ${mixinListItemDescription};
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  ${mixinListItemName};
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 10px;
`;
