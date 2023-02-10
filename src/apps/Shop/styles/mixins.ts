import {css} from 'styled-components';

import {colors} from 'apps/Shop/styles';

export const mixinListItemDescription = css`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const mixinListItemName = css`
  color: ${colors.fonts.heading};
  font-weight: 600;
`;
