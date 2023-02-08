import styled from 'styled-components';

import {mixinListItemDescription, mixinListItemName, mixinListItemThumbnail} from 'apps/University/styles';

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

export const PublicationStatus = styled.div``;

export const Thumbnail = styled.img`
  ${mixinListItemThumbnail};
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const ThumbnailContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
`;
