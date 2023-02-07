import {useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'apps/Chat/components/Button';
import NetworkSelectCard from 'apps/Chat/components/NetworkSelectCard';
import {GenericVoidFunction} from 'shared/types';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AttachNetworksModalProps {
  attachedNetworkIds: string[];
  close(): void;
  setAttachedNetworkIds: GenericVoidFunction;
}

const AttachNetworksModal: SFC<AttachNetworksModalProps> = ({
  attachedNetworkIds,
  className,
  close,
  setAttachedNetworkIds,
}) => {
  const [selectedNetworkIds, setSelectedNetworkIds] = useState<string[]>(attachedNetworkIds);
  const networks = useSelector(getNetworks);

  const handleButtonClick = () => {
    setAttachedNetworkIds(selectedNetworkIds);
    close();
  };

  const handleNetworkSelectCardClick = (networkId: string) => {
    const results = selectedNetworkIds.includes(networkId)
      ? selectedNetworkIds.filter((item) => item !== networkId)
      : [...selectedNetworkIds, networkId];

    setSelectedNetworkIds(results);
  };

  const renderNetworkSelectCardsContainer = () => {
    const networkList = Object.values(networks);
    const orderedNetworks = orderBy(networkList, ['displayName']);

    const networkSelectCards = orderedNetworks.map(({networkId}) => (
      <NetworkSelectCard
        key={networkId}
        networkId={networkId}
        onClick={() => handleNetworkSelectCardClick(networkId)}
        selectedNetworkIds={selectedNetworkIds}
      />
    ));

    return <S.NetworkSelectCardsContainer>{networkSelectCards}</S.NetworkSelectCardsContainer>;
  };

  return (
    <S.Modal className={className} close={close} header="Attach Networks">
      {renderNetworkSelectCardsContainer()}
      <S.ButtonContainer>
        <Button onClick={handleButtonClick} text="Submit" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default AttachNetworksModal;
