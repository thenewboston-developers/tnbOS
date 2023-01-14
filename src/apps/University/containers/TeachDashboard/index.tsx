import {ReactNode} from 'react';

import TeachBreadcrumbs from 'apps/University/components/TeachBreadcrumbs';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface TeachDashboardProps {
  children: ReactNode;
}

const TeachDashboard: SFC<TeachDashboardProps> = ({children, className}) => {
  return (
    <S.Container className={className}>
      <S.LeftMenu />
      <S.Right>
        <TeachBreadcrumbs />
        {children}
      </S.Right>
    </S.Container>
  );
};

export default TeachDashboard;
