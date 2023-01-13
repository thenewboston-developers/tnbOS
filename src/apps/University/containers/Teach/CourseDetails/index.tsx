import {SFC} from 'system/types';
import * as S from './Styles';

const CourseDetails: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.LeftMenu>
        <h1>Left</h1>
        <h1>Left</h1>
        <h1>Left</h1>
        <h1>Left</h1>
      </S.LeftMenu>
      <S.Right>
        <h1>Right</h1>
        <h1>Right</h1>
        <h1>Right</h1>
        <h1>Right</h1>
      </S.Right>
    </S.Container>
  );
};

export default CourseDetails;
