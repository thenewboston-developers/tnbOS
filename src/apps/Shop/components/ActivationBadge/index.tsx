import {ActivationStatus} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ActivationStatusProps {
  activationStatus: ActivationStatus;
}

const ActivationBadge: SFC<ActivationStatusProps> = ({activationStatus, className}) => {
  return (
    <S.Container activationStatus={activationStatus} className={className}>
      {activationStatus}
    </S.Container>
  );
};

export default ActivationBadge;
