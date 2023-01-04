import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface ErrorProps {
  children: ReactNode;
}

const Error: SFC<ErrorProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default Error;
