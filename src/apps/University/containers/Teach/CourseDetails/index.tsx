import Dashboard from 'apps/University/containers/Teach/Dashboard';
import {SFC} from 'system/types';
import * as S from './Styles';

const CourseDetails: SFC = ({className}) => {
  return (
    <Dashboard>
      <S.Container className={className}>
        <S.SectionHeading heading="Course Details" />
      </S.Container>
    </Dashboard>
  );
};

export default CourseDetails;
