import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface ToolsProps {
  children: ReactNode;
}

const Tools: SFC<ToolsProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default Tools;
