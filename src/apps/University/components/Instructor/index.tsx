import {useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface InstructorProps {
  accountNumber: string;
}

const Instructor: SFC<InstructorProps> = ({accountNumber, className}) => {
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <S.Container className={className}>
      <S.Avatar accountNumber={accountNumber} />
      <S.Right>
        <S.Name>{displayName}</S.Name>
        <S.Description>Instructor</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default Instructor;
