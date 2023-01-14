import noop from 'lodash/noop';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface BreadcrumbItemProps {
  children: string;
  isActive: boolean;
  onClick?: GenericVoidFunction;
}
const BreadcrumbItem: SFC<BreadcrumbItemProps> = ({children, className, isActive, onClick = noop}) => {
  return (
    <S.Container className={className} isActive={isActive} onClick={onClick}>
      {children}
    </S.Container>
  );
};

export default BreadcrumbItem;
