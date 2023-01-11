import {SFC} from 'system/types';
import * as S from './Styles';

const TopTabs: SFC = ({className}) => {
  const renderTabs = () => {
    return (
      <>
        <S.Tab isActive={true}>Learn</S.Tab>
        <S.Tab>Teach</S.Tab>
        <S.Tab>My Profile</S.Tab>
      </>
    );
  };

  return <S.Container className={className}>{renderTabs()}</S.Container>;
};

export default TopTabs;
