import AccountLabel from 'apps/Art/components/AccountLabel';
import ArtMiniDetails from 'apps/Art/components/ArtMiniDetails';
import {SFC} from 'system/types';
import * as S from './Styles';

const Transfers: SFC = ({className}) => {
  const renderTabs = () => {
    return (
      <S.Tabs>
        <S.Tab isActive={true}>Incoming</S.Tab>
        <S.Tab>Outgoing</S.Tab>
      </S.Tabs>
    );
  };

  const renderTransferGrid = () => {
    return (
      <S.TransferGrid>
        <ArtMiniDetails />
        <div>
          <AccountLabel />
        </div>
        <div>
          <AccountLabel />
        </div>
        <div>buttons</div>

        <ArtMiniDetails />
        <div>
          <AccountLabel />
        </div>
        <div>
          <AccountLabel />
        </div>
        <div>buttons</div>
      </S.TransferGrid>
    );
  };

  return (
    <S.Container className={className}>
      {renderTabs()}
      {renderTransferGrid()}
    </S.Container>
  );
};

export default Transfers;
