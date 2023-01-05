import {useDispatch} from 'react-redux';

import EmptyPage from 'apps/Trade/components/EmptyPage';
import {useAvailableActiveNetworkIds} from 'apps/Trade/hooks';
import SelectNetworkModal from 'apps/Trade/modals/SelectNetworkModal';
import {setActiveNetworkId} from 'apps/Trade/store/manager';
import {useToggle} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import ActiveNetworkEmptyStateGraphic from './assets/active-network-empty-state.png';

const EmptyActiveNetworkPage: SFC = ({className}) => {
  const [selectNetworkModalIsOpen, toggleSelectNetworkModal] = useToggle(false);
  const availableActiveNetworkIds = useAvailableActiveNetworkIds();
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectNetworkModalSubmit = (networkId: string) => {
    dispatch(setActiveNetworkId(networkId));
    toggleSelectNetworkModal();
  };

  return (
    <>
      <EmptyPage
        actionText="Select a network."
        bottomText="Active networks are used as the base unit when trading."
        className={className}
        graphic={ActiveNetworkEmptyStateGraphic}
        onActionTextClick={toggleSelectNetworkModal}
        topText="No active network!"
      />
      {selectNetworkModalIsOpen ? (
        <SelectNetworkModal
          buttonText="Submit"
          close={toggleSelectNetworkModal}
          handleSelectNetworkModalSubmit={handleSelectNetworkModalSubmit}
          header="Select Active Network"
          networkIds={availableActiveNetworkIds}
        />
      ) : null}
    </>
  );
};

export default EmptyActiveNetworkPage;
