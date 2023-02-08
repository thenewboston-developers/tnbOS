import styled from 'styled-components';

import UThumbnail from 'apps/University/components/Thumbnail';
import {mixinListItemDescription, mixinListItemName} from 'apps/University/styles';

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

export const PublicationStatus = styled.div``;

export const Thumbnail = styled(UThumbnail)`
  &:hover {
    cursor: pointer;
  }
`;
