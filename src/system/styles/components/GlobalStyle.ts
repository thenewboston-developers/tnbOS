import {createGlobalStyle} from 'styled-components';

import {colors} from 'system/styles';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: ${colors.neutral['075']};
    margin: 0;
  }
`;

export default GlobalStyle;
