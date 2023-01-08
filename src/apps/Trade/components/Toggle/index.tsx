import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

interface ToggleProps {
  checked: boolean;
  onClick: GenericVoidFunction;
}

const Toggle: SFC<ToggleProps> = ({checked, className, onClick}) => {
  return (
    <S.Container checked={checked} className={className} onClick={onClick}>
      <S.Inner checked={checked} />
    </S.Container>
  );
};

export default Toggle;
