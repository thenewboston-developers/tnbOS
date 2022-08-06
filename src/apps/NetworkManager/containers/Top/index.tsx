import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);

  return (
    <>
      <S.Container className={className}>
        <h2>Network Manager</h2>
        <S.Button onClick={toggleNetworkModal} text="Add Network" />
      </S.Container>
      {networkModalIsOpen ? <NetworkModal close={toggleNetworkModal} /> : null}
    </>
  );
};

export default Top;
