import {css} from 'styled-components';

import {colors} from 'apps/University/styles';

export const mixinLeftMenu = css`
  background: ${colors.fonts.leftMenuBackground};
  color: ${colors.fonts.leftMenuText};
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: auto;
`;
