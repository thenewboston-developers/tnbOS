import {useState} from 'react';
import {mdiChevronRight} from '@mdi/js';

import Button from 'apps/Trade/components/Button';
import {ButtonContainer} from 'apps/Trade/components/FormElements';
import RadioCard from 'apps/Trade/components/RadioCard';
import {useAvailableClientAssets} from 'apps/Trade/hooks';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

interface SelectNetworkModalProps {
  close(): void;
  handleSelectNetworkModalSubmit: GenericVoidFunction;
}

const SelectNetworkModal: SFC<SelectNetworkModalProps> = ({className, close, handleSelectNetworkModalSubmit}) => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(null);
  const availableClientAssets = useAvailableClientAssets();

  const handleRadioCardClick = (networkId: string) => {
    setSelectedNetworkId(networkId === selectedNetworkId ? null : networkId);
  };

  const renderRadioCards = () => {
    return availableClientAssets.map((networkId) => (
      <RadioCard
        handleRadioCardClick={() => handleRadioCardClick(networkId)}
        key={networkId}
        networkId={networkId}
        selectedNetworkId={selectedNetworkId}
      />
    ));
  };

  const handleSubmit = () => {
    handleSelectNetworkModalSubmit(selectedNetworkId);
  };

  return (
    <S.Modal className={className} close={close} header="Add Offer Terms">
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <ButtonContainer>
        <Button disabled={!selectedNetworkId} iconRight={mdiChevronRight} onClick={handleSubmit} text="Next" />
      </ButtonContainer>
    </S.Modal>
  );
};

export default SelectNetworkModal;
