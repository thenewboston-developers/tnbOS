import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import AppHeader from 'system/components/AppHeader';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);

  return (
    <>
      <AppHeader className={className}>
        <h2>Network Manager</h2>
        <S.Button onClick={toggleNetworkModal} text="Add Network" />
      </AppHeader>
      {networkModalIsOpen ? <NetworkModal close={toggleNetworkModal} /> : null}
    </>
  );
};

export default Top;
