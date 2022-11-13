import {SFC} from 'system/types';
import * as S from './Styles';

interface AccountModalProps {
  close(): void;
}

const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Select Account">
      Account cards here
    </S.Modal>
  );
};

export default AccountModal;
