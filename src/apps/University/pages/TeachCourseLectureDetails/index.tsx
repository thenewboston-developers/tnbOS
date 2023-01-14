import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {SFC} from 'system/types';
import * as S from './Styles';

const TeachCourseLectureDetails: SFC = ({className}) => {
  return (
    <TeachDashboard>
      <S.Container className={className}>
        <div>Course lecture details here</div>
      </S.Container>
    </TeachDashboard>
  );
};

export default TeachCourseLectureDetails;
