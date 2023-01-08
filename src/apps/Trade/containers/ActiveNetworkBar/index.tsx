import {useDispatch, useSelector} from 'react-redux';

import {useAvailableActiveNetworkIds} from 'apps/Trade/hooks';
import SelectNetworkModal from 'apps/Trade/modals/SelectNetworkModal';
import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {setActiveNetworkId} from 'apps/Trade/store/manager';
import {useNetworkDisplayImage, useToggle} from 'system/hooks';
import {getBalances} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const ActiveNetworkBar: SFC = ({className}) => {
  const [selectNetworkModalIsOpen, toggleSelectNetworkModal] = useToggle(false);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const availableActiveNetworkIds = useAvailableActiveNetworkIds();
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const networkDisplayImage = useNetworkDisplayImage(activeNetworkId);

  const handleSelectNetworkModalSubmit = (networkId: string) => {
    dispatch(setActiveNetworkId(networkId));
    toggleSelectNetworkModal();
  };

  const renderActiveNetwork = () => {
    return <S.ActiveNetwork onClick={toggleSelectNetworkModal}>Active Network: {activeNetworkId}</S.ActiveNetwork>;
  };

  const renderBalance = () => {
    const amount = (activeNetworkId && balances[activeNetworkId]) || 0;
    return (
      <S.Balance onClick={toggleSelectNetworkModal}>
        <S.Amount>{amount.toLocaleString()}</S.Amount>
        <S.Logo src={networkDisplayImage} />
      </S.Balance>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderActiveNetwork()}
        {renderBalance()}
      </S.Container>
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

export default ActiveNetworkBar;
