import {mdiQrcodeScan} from '@mdi/js';

import Icon from 'system/components/Icon';
import ToolbarItem from 'system/components/ToolbarItem';
import {useToggle} from 'system/hooks';
import AccountNumberModal from 'system/modals/AccountNumberModal';
import {SFC} from 'system/types';

const QrIcon: SFC = ({className}) => {
  const [accountNumberModalIsOpen, toggleAccountNumberModal] = useToggle(false);

  return (
    <>
      <ToolbarItem className={className}>
        <Icon onClick={toggleAccountNumberModal} icon={mdiQrcodeScan} unfocusable />
      </ToolbarItem>
      {accountNumberModalIsOpen ? <AccountNumberModal close={toggleAccountNumberModal} /> : null}
    </>
  );
};

export default QrIcon;
