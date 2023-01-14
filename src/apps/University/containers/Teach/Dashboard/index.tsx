import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface DashboardProps {
  children: ReactNode;
}

const Dashboard: SFC<DashboardProps> = ({children, className}) => {
  return (
    <S.Container className={className}>
      <S.LeftMenu />
      <S.Right>{children}</S.Right>
    </S.Container>
  );
};

export default Dashboard;
