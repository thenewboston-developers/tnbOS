import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ActionLinkProps {
  children: string;
  onClick: GenericVoidFunction;
}

const ActionLink: SFC<ActionLinkProps> = ({children, className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      {children}
    </S.Container>
  );
};

export default ActionLink;
