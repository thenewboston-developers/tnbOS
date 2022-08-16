import {css} from 'styled-components';

import colors from 'apps/Chat/styles/colors';
import fonts from 'apps/Chat/styles/fonts';

export const inputStyle = css`
  background: #40444b;
  border-radius: 4px;
  color: ${fonts.color.default};
  font-family: ${fonts.family.default};
  font-size: 14px;
  height: 44px;
  outline: 0;
  padding: 10px 14px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

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
