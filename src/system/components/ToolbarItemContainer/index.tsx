import {ReactNode, RefObject} from 'react';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ToolbarItemContainerProps {
  children: ReactNode;
  onClick?: GenericVoidFunction;
  refObject?: RefObject<HTMLDivElement>;
}

const ToolbarItemContainer: SFC<ToolbarItemContainerProps> = ({children, className, onClick, refObject}) => {
  return (
    <S.Container className={className} onClick={onClick} ref={refObject}>
      {children}
    </S.Container>
  );
};

export default ToolbarItemContainer;
