import Identification from 'apps/Chat/components/Identification';
import SelectCard from 'apps/Chat/components/SelectCard';
import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface NetworkSelectCardProps {
  networkId: string;
  onClick: GenericVoidFunction;
  selectedNetworkIds: string[];
}

const NetworkSelectCard: SFC<NetworkSelectCardProps> = ({className, networkId, onClick, selectedNetworkIds}) => {
  const displayImage = useNetworkDisplayImage(networkId);
  const displayName = useNetworkDisplayName(networkId);

  return (
    <SelectCard className={className} isSelected={selectedNetworkIds.includes(networkId)} onClick={onClick}>
      <Identification bottomText={truncate(networkId, 32)} displayImage={displayImage} topText={displayName} />
    </SelectCard>
  );
};

export default NetworkSelectCard;
