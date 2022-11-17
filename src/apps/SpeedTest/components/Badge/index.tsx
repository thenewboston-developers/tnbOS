import {RunStatus} from 'apps/SpeedTest/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface BadgeProps {
  status: RunStatus;
}

const Badge: SFC<BadgeProps> = ({className, status}) => {
  return (
    <S.Container className={className} status={status}>
      {status}
    </S.Container>
  );
};

export default Badge;
