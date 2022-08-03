import NetworkCard from 'apps/NetworkManager/components/NetworkCard';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const renderNetworkCards = () => {
    return (
      <>
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
        <NetworkCard />
      </>
    );
  };

  return <S.Container className={className}>{renderNetworkCards()}</S.Container>;
};

export default MainArea;
