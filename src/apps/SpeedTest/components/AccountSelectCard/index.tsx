import {useDispatch, useSelector} from 'react-redux';

import Identification from 'apps/SpeedTest/components/Identification';
import SelectCard from 'apps/SpeedTest/components/SelectCard';
import {getActiveAccountNumber} from 'apps/SpeedTest/selectors/state';
import {setActiveAccountNumber} from 'apps/SpeedTest/store/manager';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountSelectCardProps {
  accountNumber: string;
}

const AccountSelectCard: SFC<AccountSelectCardProps> = ({accountNumber, className}) => {
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const dispatch = useDispatch<AppDispatch>();
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 16);

  const handleClick = () => {
    if (accountNumber === activeAccountNumber) {
      dispatch(setActiveAccountNumber(null));
    } else {
      dispatch(setActiveAccountNumber(accountNumber));
    }
  };

  return (
    <SelectCard className={className} isSelected={accountNumber === activeAccountNumber} onClick={handleClick}>
      <Identification bottomText={truncate(accountNumber, 32)} displayImage={displayImage} topText={displayName} />
    </SelectCard>
  );
};

export default AccountSelectCard;
