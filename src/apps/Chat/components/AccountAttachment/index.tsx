import {useSelector} from 'react-redux';
import {mdiArrowRightBoldCircleOutline, mdiCheckBold} from '@mdi/js';

import {getAccounts} from 'system/selectors/state';
import {Account, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface AccountAttachmentProps {
  attachedAccount: Account;
}

const AccountAttachment: SFC<AccountAttachmentProps> = ({attachedAccount, className}) => {
  const accounts = useSelector(getAccounts);

  const localAccount = accounts[attachedAccount.accountNumber];

  const renderAvatar = (account: Account) => (
    <S.AlignCenter>
      <S.Img alt="avatar" src={account.displayImage} />
    </S.AlignCenter>
  );

  const renderAvatarURL = (account: Account) => (
    <S.AlignCenter>
      <S.Label>Avatar URL</S.Label>
      <div>{truncate(account.displayImage, 16)}</div>
    </S.AlignCenter>
  );

  const renderCenter = () => {
    const hasDifferences =
      attachedAccount.displayImage !== localAccount.displayImage ||
      attachedAccount.displayName !== localAccount.displayName;

    const path = hasDifferences ? mdiArrowRightBoldCircleOutline : mdiCheckBold;

    return (
      <S.Center>
        <S.Icon $hasDifferences={hasDifferences} path={path} size="48px" />
      </S.Center>
    );
  };

  const renderDisplayName = (account: Account) => (
    <S.AlignCenter>
      <S.Label>Display Name</S.Label>
      <div>{truncate(account.displayName, 16)}</div>
    </S.AlignCenter>
  );

  return (
    <S.Container className={className}>
      <S.Top>Account: {truncate(attachedAccount.accountNumber, 32)}</S.Top>
      <S.Bottom>
        <S.Left>
          <S.Heading>Attachment</S.Heading>
          {renderAvatar(attachedAccount)}
          {renderDisplayName(attachedAccount)}
          {renderAvatarURL(attachedAccount)}
        </S.Left>
        {renderCenter()}
        <S.Right>
          <S.Heading>Yours</S.Heading>
          {renderAvatar(localAccount)}
          {renderDisplayName(localAccount)}
          {renderAvatarURL(localAccount)}
        </S.Right>
      </S.Bottom>
    </S.Container>
  );
};

export default AccountAttachment;
