import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface EmptyStateProps {
  actionText?: string;
  bottomText: string;
  graphic: string;
  onActionTextClick?: GenericVoidFunction;
  topText: string;
}

const EmptyState: SFC<EmptyStateProps> = ({actionText, bottomText, className, graphic, onActionTextClick, topText}) => {
  const renderActionText = () => {
    if (!actionText || !onActionTextClick) return null;
    return <S.SpanBlue onClick={onActionTextClick}>{actionText}</S.SpanBlue>;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="Empty state" src={graphic} />
      <S.H3>{topText}</S.H3>
      <S.HelperText>
        <S.SpanGray>{bottomText}</S.SpanGray> {renderActionText()}
      </S.HelperText>
    </S.Container>
  );
};

export default EmptyState;
