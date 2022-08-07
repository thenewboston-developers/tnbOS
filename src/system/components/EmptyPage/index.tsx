import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface EmptyPageProps {
  actionText?: string;
  bottomText: string;
  graphic: string;
  onActionTextClick?: GenericVoidFunction;
  topText: string;
}

const EmptyPage: SFC<EmptyPageProps> = ({actionText, bottomText, className, graphic, onActionTextClick, topText}) => {
  return (
    <S.Container className={className}>
      <S.EmptyState
        actionText={actionText}
        bottomText={bottomText}
        graphic={graphic}
        onActionTextClick={onActionTextClick}
        topText={topText}
      />
    </S.Container>
  );
};

export default EmptyPage;
