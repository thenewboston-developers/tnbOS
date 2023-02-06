import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AccountAttachmentProps {
  accountNumber: string;
}

const AccountAttachment: SFC<AccountAttachmentProps> = ({accountNumber, className}) => {
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 10);

  return (
    <S.Container className={className}>
      <S.Img alt="display image" src={displayImage} />
      <S.Text>{displayName}</S.Text>
    </S.Container>
  );
};

export default AccountAttachment;
