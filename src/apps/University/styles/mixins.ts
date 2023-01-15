import {css} from 'styled-components';

import {colors} from 'apps/University/styles';

export const mixinLeftMenu = css`
  background: ${colors.fonts.leftMenuBackground};
  color: ${colors.fonts.leftMenuText};
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const mixinListItemDescription = css`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const mixinListItemName = css`
  color: ${colors.fonts.heading};
  font-weight: 600;
`;

export const mixinListItemThumbnail = css`
  border-radius: 4px;
  height: auto;
`;
