import styled from 'styled-components';

import {colors, TOOLBAR_HEIGHT} from 'system/styles';

export const Divider = styled.div`
  border-left: 1px solid ${colors.palette.gray['100']};
  height: ${`${TOOLBAR_HEIGHT - 16}px`};
`;
