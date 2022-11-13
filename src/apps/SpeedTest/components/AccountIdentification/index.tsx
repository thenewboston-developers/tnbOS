import Identification from 'apps/SpeedTest/components/Identification';
import {useSafeDisplayImage, useSafeDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface AccountIdentificationProps {
  accountNumber: string;
}

const AccountIdentification: SFC<AccountIdentificationProps> = ({accountNumber, className}) => {
  const displayImage = useSafeDisplayImage(accountNumber);
  const displayName = useSafeDisplayName(accountNumber, 16);

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
