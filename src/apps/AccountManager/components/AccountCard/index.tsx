import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import AccountModal from 'apps/AccountManager/modals/AccountModal';
import PopupMenu from 'system/components/DropdownMenu';
import {useToggle} from 'system/hooks';
import {getAccounts} from 'system/selectors/state';
import {deleteAccount} from 'system/store/accounts';
import {Account, AppDispatch, OnlineStatus, SFC} from 'system/types';
import {safeDisplayImage, safeDisplayName} from 'system/utils/accounts';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface AccountCardProps {
  account: Account;
}

const AccountCard: SFC<AccountCardProps> = ({account, className}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();

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
          <S.Avatar
            displayImage={safeDisplayImage(account.accountNumber, accounts)}
            onlineStatus={OnlineStatus.online}
          />
          <S.LeftText>
            <S.DisplayName>{safeDisplayName(account.accountNumber, accounts, 16)}</S.DisplayName>
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
