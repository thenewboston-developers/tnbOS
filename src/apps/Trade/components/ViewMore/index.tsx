import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ViewMoreProps {
  onClick: GenericVoidFunction;
}

const ViewMore: SFC<ViewMoreProps> = ({className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      View more...
    </S.Container>
  );
};

export default ViewMore;
