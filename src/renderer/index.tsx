import {createRoot} from 'react-dom/client';

import Wrapper from 'system/containers/Wrapper';
import GlobalStyle from 'system/styles/components/GlobalStyle';
import ToastifyStyle from 'system/styles/components/ToastifyStyle';
import 'system/styles/fonts.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <>
    <GlobalStyle />
    <ToastifyStyle />
    <Wrapper />
  </>,
);
