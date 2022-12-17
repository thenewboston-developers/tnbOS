import {useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AccountLabelProps {
  accountNumber?: string;
  label: string;
}

const AccountLabel: SFC<AccountLabelProps> = ({accountNumber = '-', className, label}) => {
  const displayImage = useSafeDisplayImage(accountNumber);
  const displayName = useSafeDisplayName(accountNumber, 16);

  return (
    <S.Container className={className}>
      <S.Img alt="art" src={displayImage} />
      <S.Right>
        <S.TopText>{label}</S.TopText>
        <S.BottomText>{displayName}</S.BottomText>
      </S.Right>
    </S.Container>
  );
};

export default AccountLabel;
