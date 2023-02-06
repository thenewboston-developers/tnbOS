import {SFC} from 'system/types';
import * as S from './Styles';

interface AttachNetworksModalProps {
  close(): void;
}

const AttachNetworksModal: SFC<AttachNetworksModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Attach Networks">
      Networks
    </S.Modal>
  );
};

export default AttachNetworksModal;
