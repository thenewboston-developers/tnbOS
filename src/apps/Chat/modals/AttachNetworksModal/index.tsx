import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AttachNetworksModalProps {
  attachedNetworkIds: string[];
  close(): void;
  setAttachedNetworkIds: GenericVoidFunction;
}

const AttachNetworksModal: SFC<AttachNetworksModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Attach Networks">
      Networks
    </S.Modal>
  );
};

export default AttachNetworksModal;
