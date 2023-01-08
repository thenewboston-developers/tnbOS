import Identification from 'apps/SpeedTest/components/Identification';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountIdentificationProps {
  accountNumber: string;
}

const AccountIdentification: SFC<AccountIdentificationProps> = ({accountNumber, className}) => {
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 16);

  return (
    <Identification
      bottomText={truncate(accountNumber, 16)}
      className={className}
      displayImage={displayImage}
      topText={displayName}
    />
  );
};

export default AccountIdentification;
