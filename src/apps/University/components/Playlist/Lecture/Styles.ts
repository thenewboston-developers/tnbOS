import styled from 'styled-components';

import {colors, mixinListItemDescription, mixinListItemName, mixinListItemThumbnail} from 'apps/University/styles';

export const Container = styled.div<{isActive: boolean}>`
  background: ${({isActive}) => (isActive ? 'rgba(0, 0, 0, 0.06)' : 'transparent')};
  border-radius: 4px;
  display: flex;
  font-size: 12px;
  padding: 8px 8px 8px 0;
  transition: all 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
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

export const Position = styled.div`
  align-items: center;
  color: ${colors.fonts.secondary};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 0 8px;
  width: 24px;
`;

export const Thumbnail = styled.img`
  ${mixinListItemThumbnail};
  align-self: flex-start;
  flex-shrink: 0;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
`;

export const ThumbnailContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
`;
