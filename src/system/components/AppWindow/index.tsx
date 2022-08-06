import {ReactNode} from 'react';

import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

interface AppWindowProps extends AppProps {
  children: ReactNode;
}

const AppWindow: SFC<AppWindowProps> = ({children, className, display}) => {
  return (
    <S.Container className={className} $display={display}>
      {children}
    </S.Container>
  );
};

export default AppWindow;
