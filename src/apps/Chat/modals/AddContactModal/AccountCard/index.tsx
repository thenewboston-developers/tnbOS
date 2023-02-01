import {useDispatch} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {setContact} from 'apps/Chat/store/contacts';
import {useAccountDisplayImage, useAccountDisplayName, useAccountOnlineStatus} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

interface AccountCardProps {
  accountNumber: string;
  close(): void;
}

const AccountCard: SFC<AccountCardProps> = ({accountNumber, className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 16);
  const onlineStatus = useAccountOnlineStatus(accountNumber);

  const handleAddContact = () => {
    const now = currentSystemDate();

    dispatch(
      setContact({
        accountNumber,
        lastActivityDate: now,
        lastSeenDate: now,
      }),
    );

    close();
  };

  return (
    <S.Container className={className}>
      <Avatar displayImage={displayImage} onlineStatus={onlineStatus} />
      <S.TextContainer>
        <S.DisplayName>{displayName}</S.DisplayName>
        <S.AccountNumber>{truncate(accountNumber, 24)}</S.AccountNumber>
      </S.TextContainer>
      <Button color={ButtonColor.success} onClick={handleAddContact} text="Add" />
    </S.Container>
  );
};

export default AccountCard;
