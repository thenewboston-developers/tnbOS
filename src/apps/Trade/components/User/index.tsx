import {useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface UserProps {
  accountNumber: string;
  description: string;
}

const User: SFC<UserProps> = ({accountNumber, className, description}) => {
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <S.Container className={className}>
      <S.Avatar accountNumber={accountNumber} />
      <S.Right>
        <S.Name>{displayName}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default User;
