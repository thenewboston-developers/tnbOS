import {css} from 'styled-components';

import colors from 'apps/Chat/styles/colors';

export const scrollStyle = css`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.dark};
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;
