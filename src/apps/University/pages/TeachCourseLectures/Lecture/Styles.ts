import styled from 'styled-components';

import {mixinListItemDescription, mixinListItemName, mixinListItemThumbnail} from 'apps/University/styles';

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
`;

export const Thumbnail = styled.img`
  ${mixinListItemThumbnail};
  align-self: flex-start;
  flex-shrink: 0;
  width: 100px;
`;
