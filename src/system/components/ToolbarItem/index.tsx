import {ReactNode, RefObject} from 'react';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ToolbarItemProps {
  children: ReactNode;
  onClick?: GenericVoidFunction;
  refObject?: RefObject<HTMLDivElement>;
}

const ToolbarItem: SFC<ToolbarItemProps> = ({children, className, onClick, refObject}) => {
  return (
    <S.Container className={className} onClick={onClick} ref={refObject}>
      {children}
    </S.Container>
  );
};

export default ToolbarItem;
