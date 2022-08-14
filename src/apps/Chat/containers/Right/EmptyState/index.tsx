import {SFC} from 'system/types';
import EmptyStateIcon from './assets/empty-state.png';
import * as S from './Styles';

const EmptyState: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="Empty state" src={EmptyStateIcon} />
      <S.H3>Nothing here!</S.H3>
      <S.Bottom>
        <S.HelperText>There are no messages to display.</S.HelperText>{' '}
        <S.ActionText onClick={() => {}}>Create a new chat.</S.ActionText>
      </S.Bottom>
    </S.Container>
  );
};

export default EmptyState;
