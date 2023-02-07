import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiArrowRightBoldCircleOutline, mdiCheckBold, mdiDelete} from '@mdi/js';

import NoImage from 'apps/Chat/components/_Attachment/assets/no-image.png';
import * as S from 'apps/Chat/components/_Attachment/Styles';
import Tool from 'apps/Chat/components/Tool';
import {getAccounts, getSelf} from 'system/selectors/state';
import {setAccount} from 'system/store/accounts';
import {updateSelf} from 'system/store/self';
import {Account, AppDispatch, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountAttachmentProps {
  attachedAccount: Account;
  onDeleteClick: (accountNumber: string) => void;
  sender: string;
}

const AccountAttachment: SFC<AccountAttachmentProps> = ({attachedAccount, className, onDeleteClick, sender}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const localAccount =
    attachedAccount.accountNumber === self.accountNumber ? self : accounts[attachedAccount.accountNumber];

  const hasDifferences =
    attachedAccount.displayImage !== localAccount?.displayImage ||
    attachedAccount.displayName !== localAccount?.displayName;

  const handleDeleteClick = () => {
    onDeleteClick(attachedAccount.accountNumber);
  };

  const handleIconClick = () => {
    if (!hasDifferences) return;

    if (attachedAccount.accountNumber === self.accountNumber) {
      dispatch(updateSelf(attachedAccount));
    } else {
      dispatch(setAccount(attachedAccount));
    }
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
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

  const renderTools = () => {
    if (sender !== self.accountNumber || !toolsVisible) return null;
    return (
      <S.Tools>
        <Tool icon={mdiDelete} onClick={handleDeleteClick} />
      </S.Tools>
    );
  };

  return (
    <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
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
      {renderTools()}
    </S.Container>
  );
};

export default AccountAttachment;
