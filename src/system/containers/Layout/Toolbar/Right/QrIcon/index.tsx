import {mdiQrcodeScan} from '@mdi/js';

import Icon from 'system/components/Icon';
import {useToggle} from 'system/hooks';
import AccountNumberModal from 'system/modals/AccountNumberModal';
import {SFC} from 'system/types';

const QrIcon: SFC = ({className}) => {
  const [accountNumberModalIsOpen, toggleAccountNumberModal] = useToggle(false);

  return (
    <>
      <Icon className={className} onClick={toggleAccountNumberModal} icon={mdiQrcodeScan} unfocusable />
      {accountNumberModalIsOpen ? <AccountNumberModal close={toggleAccountNumberModal} /> : null}
    </>
  );
};

export default QrIcon;
