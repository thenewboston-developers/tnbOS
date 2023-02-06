import {SFC} from 'system/types';
import * as S from './Styles';

interface AttachAccountsModalProps {
  close(): void;
}

const AttachAccountsModal: SFC<AttachAccountsModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Attach Accounts">
      Accounts
    </S.Modal>
  );
};

export default AttachAccountsModal;
