import {useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AccountLabelProps {
  accountNumber: string;
  label: string;
}

const AccountLabel: SFC<AccountLabelProps> = ({accountNumber, className, label}) => {
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <S.Container className={className}>
      <S.Avatar accountNumber={accountNumber} />
      <S.Right>
        <S.Name>{displayName}</S.Name>
        <S.Description>{label}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default AccountLabel;
