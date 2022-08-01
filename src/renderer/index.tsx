import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';

import Wrapper from 'system/containers/Wrapper';
import store from 'system/store';
import GlobalStyle from 'system/styles/components/GlobalStyle';
import ToastifyStyle from 'system/styles/components/ToastifyStyle';
import 'system/styles/fonts.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <ToastifyStyle />
    <Wrapper />
  </Provider>,
);
