import {useState} from 'react';

import Button from 'apps/Trade/components/Button';
import {ButtonContainer} from 'apps/Trade/components/FormElements';
import RadioCard from 'apps/Trade/components/RadioCard';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

interface SelectNetworkModalProps {
  buttonText: string;
  close(): void;
  handleSelectNetworkModalSubmit: GenericVoidFunction;
  header: string;
  iconRight?: string;
  networkIds: string[];
}

const SelectNetworkModal: SFC<SelectNetworkModalProps> = ({
  buttonText,
  className,
  close,
  handleSelectNetworkModalSubmit,
  header,
  iconRight,
  networkIds,
}) => {
  const [selectedNetworkId, setSelectedNetworkId] = useState<string | null>(null);

  const handleRadioCardClick = (networkId: string) => {
    setSelectedNetworkId(networkId === selectedNetworkId ? null : networkId);
  };

  const renderRadioCards = () => {
    return networkIds.map((networkId) => (
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
    <S.Modal className={className} close={close} header={header}>
      <S.RadioCardContainer>{renderRadioCards()}</S.RadioCardContainer>
      <ButtonContainer>
        <Button
          disabled={!selectedNetworkId}
          iconRight={iconRight || undefined}
          onClick={handleSubmit}
          text={buttonText}
        />
      </ButtonContainer>
    </S.Modal>
  );
};

export default SelectNetworkModal;
