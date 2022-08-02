import {mdiDevTo} from '@mdi/js';

import DropupMenu, {DropupMenuDirection} from 'system/components/DropupMenu';
import {useToggle} from 'system/hooks';
import AccountNumberModal from 'system/modals/AccountNumberModal';
import {SFC, ToastType} from 'system/types';
import {clearStore} from 'system/utils/ipc';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [accountNumberModalIsOpen, toggleAccountNumberModal] = useToggle(false);

  const handleClearStore = () => {
    clearStore();
    displayToast('Store cleared', ToastType.success);
  };

  const handleShowToast = () => {
    displayToast('Noice', ToastType.success);
  };

  const developmentMenuOptions = [
    {label: 'Clear Store', onClick: handleClearStore},
    {label: 'Show Toast', onClick: handleShowToast},
  ];

  return (
    <>
      <S.Container className={className}>
        <DropupMenu direction={DropupMenuDirection.left} icon={mdiDevTo} options={developmentMenuOptions} />
        <S.Divider />
        <S.TempContainer onClick={toggleAccountNumberModal}>Click me</S.TempContainer>
      </S.Container>
      {accountNumberModalIsOpen ? <AccountNumberModal close={toggleAccountNumberModal} /> : null}
    </>
  );
};

export default Right;
