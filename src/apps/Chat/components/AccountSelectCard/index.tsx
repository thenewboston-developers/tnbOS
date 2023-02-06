import Identification from 'apps/Chat/components/Identification';
import SelectCard from 'apps/Chat/components/SelectCard';
import {GenericVoidFunction} from 'shared/types';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountSelectCardProps {
  accountNumber: string;
  onClick: GenericVoidFunction;
  selectedAccountNumbers: string[];
}

const AccountSelectCard: SFC<AccountSelectCardProps> = ({
  accountNumber,
  className,
  onClick,
  selectedAccountNumbers,
}) => {
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <SelectCard className={className} isSelected={selectedAccountNumbers.includes(accountNumber)} onClick={onClick}>
      <Identification bottomText={truncate(accountNumber, 32)} displayImage={displayImage} topText={displayName} />
    </SelectCard>
  );
};

export default AccountSelectCard;
