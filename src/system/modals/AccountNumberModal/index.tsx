import {useSelector} from 'react-redux';

import Modal from 'system/components/Modal';
import QrCopy from 'system/components/QrCopy';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';

export interface AccountNumberModalProps {
  close(): void;
}

const AccountNumberModal: SFC<AccountNumberModalProps> = ({className, close}) => {
  const self = useSelector(getSelf);

  return (
    <Modal className={className} close={close} header="My Account Number">
      <QrCopy accountNumber={self.accountNumber} />
    </Modal>
  );
};

export default AccountNumberModal;
