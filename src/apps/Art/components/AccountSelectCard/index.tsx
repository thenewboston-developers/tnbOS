import Identification from 'apps/Art/components/Identification';
import {GenericVoidFunction} from 'shared/types';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface AccountSelectCardProps {
  accountNumber: string;
  isSelected: boolean;
  onClick: GenericVoidFunction;
}

const AccountSelectCard: SFC<AccountSelectCardProps> = ({accountNumber, className, isSelected, onClick}) => {
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <S.Container className={className} isSelected={isSelected} onClick={onClick}>
      <Identification bottomText={truncate(accountNumber, 32)} displayImage={displayImage} topText={displayName} />
    </S.Container>
  );
};

export default AccountSelectCard;
