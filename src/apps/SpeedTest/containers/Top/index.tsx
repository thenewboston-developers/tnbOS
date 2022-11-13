import {useSelector} from 'react-redux';

import SpacedItems from 'apps/SpeedTest/components/SpacedItems';
import TopCard from 'apps/SpeedTest/components/TopCard';
import {getActiveAccountNumber} from 'apps/SpeedTest/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const activeAccountNumber = useSelector(getActiveAccountNumber);

  const renderAccountContent = () => {
    if (!activeAccountNumber) return <S.Button>Select Account</S.Button>;
    return <SpacedItems />;
  };

  return (
    <S.Container className={className}>
      <TopCard heading="Account">{renderAccountContent()}</TopCard>
      <TopCard heading="Network">
        <SpacedItems />
      </TopCard>
    </S.Container>
  );
};

export default Top;
