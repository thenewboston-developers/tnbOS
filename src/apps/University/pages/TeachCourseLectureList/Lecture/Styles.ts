import styled from 'styled-components';

import UThumbnail from 'apps/University/components/Thumbnail';
import {colors, mixinListItemDescription, mixinListItemName} from 'apps/University/styles';

export const Actions = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const Container = styled.div`
  display: flex;
`;

export const Description = styled.div`
  ${mixinListItemDescription};
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  ${mixinListItemName};
  font-size: 13px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Position = styled.div`
  align-items: center;
  color: ${colors.fonts.secondary};
  display: flex;
  font-size: 12px;
  justify-content: center;
  padding: 0 8px;
  width: 24px;
`;

export const PublicationStatus = styled.div``;

export const Thumbnail = styled(UThumbnail)`
  &:hover {
    cursor: pointer;
  }
`;
