import {useMemo, useState} from 'react';
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

  const orderedNetworks = useMemo(() => {
    const networkList = Object.values(networks);
    return orderBy(networkList, ['displayName']);
  }, [networks]);

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

  const renderEmptyNetworks = () => <S.ModalEmptyState heading="Nothing here!" helperText="No networks to display" />;

  const renderModalContent = () => {
    if (!orderedNetworks.length) return renderEmptyNetworks();

    return (
      <>
        {renderNetworkSelectCardsContainer()}
        <S.ButtonContainer>
          <Button onClick={handleButtonClick} text="Submit" />
        </S.ButtonContainer>
      </>
    );
  };

  const renderNetworkSelectCardsContainer = () => {
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
      {renderModalContent()}
    </S.Modal>
  );
};

export default AttachNetworksModal;
