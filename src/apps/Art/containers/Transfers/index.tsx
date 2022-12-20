import AccountLabel from 'apps/Art/components/AccountLabel';
import ArtMiniDetails from 'apps/Art/components/ArtMiniDetails';
import OutlineButton, {ButtonColor} from 'apps/Art/components/OutlineButton';
import {useIncomingTransferArtworks, useOutgoingTransferArtworks} from 'apps/Art/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Transfers: SFC = ({className}) => {
  const incomingTransferArtworks = useIncomingTransferArtworks();
  const outgoingTransferArtworks = useOutgoingTransferArtworks();

  const renderRows = () => {
    return (
      <>
        <ArtMiniDetails />
        <div>
          <AccountLabel
            accountNumber="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0"
            label="Creator"
          />
        </div>
        <div>
          <AccountLabel
            accountNumber="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0"
            label="Creator"
          />
        </div>
        <S.ButtonContainer>
          <OutlineButton color={ButtonColor.danger} onClick={() => {}} text="Decline" />
          <OutlineButton color={ButtonColor.success} onClick={() => {}} text="Accept" />
        </S.ButtonContainer>
      </>
    );
  };

  const renderTabs = () => {
    return (
      <S.Tabs>
        <S.Tab isActive={true}>Incoming</S.Tab>
        <S.Tab>Outgoing</S.Tab>
      </S.Tabs>
    );
  };

  const renderTransferGrid = () => {
    return <S.TransferGrid>{renderRows()}</S.TransferGrid>;
  };

  return (
    <S.Container className={className}>
      {renderTabs()}
      {renderTransferGrid()}
    </S.Container>
  );
};

export default Transfers;
