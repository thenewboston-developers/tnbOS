import Dashboard from 'apps/University/containers/Dashboard';
import {SFC} from 'system/types';
import * as S from './Styles';

const TeachCourseLectureDetails: SFC = ({className}) => {
  return (
    <Dashboard>
      <S.Container className={className}>
        <div>Course lecture details here</div>
      </S.Container>
    </Dashboard>
  );
};

export default TeachCourseLectureDetails;
