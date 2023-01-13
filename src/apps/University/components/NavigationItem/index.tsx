import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface NavigationItemProps {
  isActive: boolean;
  onClick: GenericVoidFunction;
  text: string;
}

const NavigationItem: SFC<NavigationItemProps> = ({className, isActive, onClick, text}) => {
  return (
    <S.Container className={className} isActive={isActive} onClick={onClick}>
      {text}
    </S.Container>
  );
};

export default NavigationItem;
