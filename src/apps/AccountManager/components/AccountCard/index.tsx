import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import AccountModal from 'apps/AccountManager/modals/AccountModal';
import PopupMenu from 'system/components/DropdownMenu';
import {useSafeDisplayImage, useSafeDisplayName, useToggle} from 'system/hooks';
import {deleteAccount} from 'system/store/accounts';
import {Account, AppDispatch, OnlineStatus, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface AccountCardProps {
  account: Account;
}

const AccountCard: SFC<AccountCardProps> = ({account, className}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useSafeDisplayImage(account.accountNumber);
  const displayName = useSafeDisplayName(account.accountNumber, 16);

  const handleDeleteAccount = () => {
    dispatch(deleteAccount(account.accountNumber));
  };

  const menuOptions = [
    {label: 'Edit', onClick: toggleAccountModal},
    {label: 'Delete', onClick: handleDeleteAccount},
  ];

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.Avatar displayImage={displayImage} onlineStatus={OnlineStatus.online} />
          <S.LeftText>
            <S.DisplayName>{displayName}</S.DisplayName>
            <S.AccountNumber>{truncate(account.accountNumber, 24)}</S.AccountNumber>
          </S.LeftText>
        </S.Left>
        <S.Right>
          <PopupMenu icon={mdiDotsVertical} options={menuOptions} />
        </S.Right>
      </S.Container>
      {accountModalIsOpen ? <AccountModal account={account} close={toggleAccountModal} /> : null}
    </>
  );
};

export default AccountCard;
