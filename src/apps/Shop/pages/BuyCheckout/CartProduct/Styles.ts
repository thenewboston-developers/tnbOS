import styled from 'styled-components';

import {mixinListItemDescription, mixinListItemName} from 'apps/Shop/styles';

export const Description = styled.div`
  ${mixinListItemDescription};
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  ${mixinListItemName};
`;
