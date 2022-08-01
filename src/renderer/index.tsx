import {createRoot} from 'react-dom/client';

import Wrapper from 'system/containers/Wrapper';
import GlobalStyle from 'system/styles/components/GlobalStyle';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <>
    <GlobalStyle />
    <Wrapper />
  </>,
);
