import modalTheme from 'apps/Chat/themes/modal';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AddContactModalProps {
  close(): void;
}

const AddContactModal: SFC<AddContactModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="New Chat" theme={modalTheme}>
      Hey
    </S.Modal>
  );
};

export default AddContactModal;
