import styled from 'styled-components';

import UThumbnail from 'apps/Shop/components/Thumbnail';
import {mixinListItemDescription, mixinListItemName} from 'apps/Shop/styles';

export const ActivationStatus = styled.div``;

export const Actions = styled.div`
  font-size: 13px;
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

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Thumbnail = styled(UThumbnail)`
  &:hover {
    cursor: pointer;
  }
`;
