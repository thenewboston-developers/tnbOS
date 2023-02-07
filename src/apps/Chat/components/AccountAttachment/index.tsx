import {useDispatch, useSelector} from 'react-redux';
import {mdiArrowRightBoldCircleOutline, mdiCheckBold} from '@mdi/js';

import NoImage from 'apps/Chat/components/_Attachment/assets/no-image.png';
import * as S from 'apps/Chat/components/_Attachment/Styles';
import {getAccounts} from 'system/selectors/state';
import {setAccount} from 'system/store/accounts';
import {Account, AppDispatch, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountAttachmentProps {
  attachedAccount: Account;
}

const AccountAttachment: SFC<AccountAttachmentProps> = ({attachedAccount, className}) => {
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();

  const localAccount = accounts[attachedAccount.accountNumber];

  const hasDifferences =
    attachedAccount.displayImage !== localAccount?.displayImage ||
    attachedAccount.displayName !== localAccount?.displayName;

  const handleIconClick = () => {
    if (!hasDifferences) return;
    dispatch(setAccount(attachedAccount));
  };

  const renderAvatar = (account?: Account) => {
    const src = account?.displayImage ? account.displayImage : NoImage;

    return (
      <S.AlignCenter>
        <S.Img alt="avatar" src={src} />
      </S.AlignCenter>
    );
  };

  const renderAvatarURL = (account?: Account) => {
    const url = account?.displayImage ? truncate(account.displayImage, 16) : '-';

    return (
      <S.AlignCenter>
        <S.Label>Avatar URL</S.Label>
        <div>{url}</div>
      </S.AlignCenter>
    );
  };

  const renderCenter = () => {
    const path = hasDifferences ? mdiArrowRightBoldCircleOutline : mdiCheckBold;

    return (
      <S.Center>
        <div onClick={handleIconClick}>
          <S.Icon $hasDifferences={hasDifferences} path={path} size="48px" />
        </div>
      </S.Center>
    );
  };

  const renderDisplayName = (account?: Account) => {
    const displayName = account?.displayName ? truncate(account.displayName, 16) : '-';

    return (
      <S.AlignCenter>
        <S.Label>Display Name</S.Label>
        <div>{displayName}</div>
      </S.AlignCenter>
    );
  };

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
