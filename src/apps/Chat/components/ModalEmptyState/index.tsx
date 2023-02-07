import * as S from 'apps/Chat/components/_EmptyState/Styles';
import {SFC} from 'system/types';

export interface ModalEmptyStateProps {
  heading: string;
  helperText: string;
}

const ModalEmptyState: SFC<ModalEmptyStateProps> = ({className, heading, helperText}) => {
  return (
    <S.Container className={className}>
      <S.H3>{heading}</S.H3>
      <S.Bottom>
        <S.HelperText>{helperText}</S.HelperText>
      </S.Bottom>
    </S.Container>
  );
};

export default ModalEmptyState;
