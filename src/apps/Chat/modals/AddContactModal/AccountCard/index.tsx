import {useDispatch} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {setContact} from 'apps/Chat/store/contacts';
import {useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {AppDispatch, OnlineStatus, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

interface AccountCardProps {
  accountNumber: string;
  close(): void;
}

const AccountCard: SFC<AccountCardProps> = ({accountNumber, className, close}) => {
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useSafeDisplayImage(accountNumber);
  const displayName = useSafeDisplayName(accountNumber, 16);

  const handleAddContact = () => {
    dispatch(
      setContact({
        accountNumber,
        lastActivityDate: currentSystemDate(),
      }),
    );
    close();
  };

  return (
    <S.Container className={className}>
      <Avatar displayImage={displayImage} onlineStatus={OnlineStatus.online} />
      <S.TextContainer>
        <S.DisplayName>{displayName}</S.DisplayName>
        <S.AccountNumber>{truncate(accountNumber, 24)}</S.AccountNumber>
      </S.TextContainer>
      <Button color={ButtonColor.success} onClick={handleAddContact} text="Add" />
    </S.Container>
  );
};

export default AccountCard;
