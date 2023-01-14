import Dashboard from 'apps/University/containers/Teach/Dashboard';
import {SFC} from 'system/types';
import * as S from './Styles';

const CourseLectures: SFC = ({className}) => {
  return (
    <Dashboard>
      <S.Container className={className}>
        <div>Course lectures here</div>
      </S.Container>
    </Dashboard>
  );
};

export default CourseLectures;
