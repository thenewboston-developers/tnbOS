import AccountLabel from 'apps/Art/components/AccountLabel';
import ArtMiniDetails from 'apps/Art/components/ArtMiniDetails';
import OutlineButton, {ButtonColor} from 'apps/Art/components/OutlineButton';
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
        <S.ButtonContainer>
          <OutlineButton color={ButtonColor.danger} onClick={() => {}} text="Decline" />
          <OutlineButton color={ButtonColor.success} onClick={() => {}} text="Accept" />
        </S.ButtonContainer>

        <ArtMiniDetails />
        <div>
          <AccountLabel />
        </div>
        <div>
          <AccountLabel />
        </div>
        <S.ButtonContainer>
          <OutlineButton color={ButtonColor.danger} onClick={() => {}} text="Decline" />
          <OutlineButton color={ButtonColor.success} onClick={() => {}} text="Accept" />
        </S.ButtonContainer>
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
