import {useDispatch, useSelector} from 'react-redux';

import NetworkIdentification from 'apps/SpeedTest/components/NetworkIdentification';
import SelectCard from 'apps/SpeedTest/components/SelectCard';
import {getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {setActiveNetworkId} from 'apps/SpeedTest/store/manager';
import {AppDispatch, SFC} from 'system/types';

export interface NetworkSelectCardProps {
  networkId: string;
}

const NetworkSelectCard: SFC<NetworkSelectCardProps> = ({className, networkId}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (networkId === activeNetworkId) {
      dispatch(setActiveNetworkId(null));
    } else {
      dispatch(setActiveNetworkId(networkId));
    }
  };

  return (
    <SelectCard className={className} isSelected={networkId === activeNetworkId} onClick={handleClick}>
      <NetworkIdentification networkId={networkId} />
    </SelectCard>
  );
};

export default NetworkSelectCard;
