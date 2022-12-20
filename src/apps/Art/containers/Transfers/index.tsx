import React, {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ArtMiniDetails from 'apps/Art/components/ArtMiniDetails';
import OutlineButton, {ButtonColor} from 'apps/Art/components/OutlineButton';
import {useIncomingTransferArtworks, useOutgoingTransferArtworks} from 'apps/Art/hooks';
import {deleteArtwork} from 'apps/Art/store/artworks';
import {getSecondToLastBlock} from 'apps/Art/utils/blocks';
import NetworksEmptyStateGraphic from 'apps/NetworkManager/assets/networks-empty-state.png';
import EmptyPage from 'system/components/EmptyPage';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

enum Tab {
  incoming = 'incoming',
  outgoing = 'outgoing',
}

const Transfers: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.incoming);
  const dispatch = useDispatch<AppDispatch>();
  const incomingTransferArtworks = useIncomingTransferArtworks();
  const outgoingTransferArtworks = useOutgoingTransferArtworks();

  const artworks = useMemo(() => {
    return activeTab === Tab.incoming ? incomingTransferArtworks : outgoingTransferArtworks;
  }, [activeTab, incomingTransferArtworks, outgoingTransferArtworks]);

  const handleDeleteClick = (artworkId: string) => {
    dispatch(deleteArtwork(artworkId));
    displayToast('Artwork deleted', ToastType.success);
  };

  const renderButtons = (artworkId: string) => {
    if (activeTab === Tab.incoming) {
      return (
        <>
          <OutlineButton color={ButtonColor.danger} onClick={() => {}} text="Decline" />
          <OutlineButton color={ButtonColor.success} onClick={() => {}} text="Accept" />
        </>
      );
    } else {
      return <OutlineButton color={ButtonColor.danger} onClick={() => handleDeleteClick(artworkId)} text="Delete" />;
    }
  };

  const renderEmptyPage = () => {
    return (
      <EmptyPage
        bottomText={`No ${activeTab} transfers to display.`}
        graphic={NetworksEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (isEmpty(artworks)) return renderEmptyPage();
    return <S.TransferGrid>{renderRows()}</S.TransferGrid>;
  };

  const renderRows = () => {
    return Object.values(artworks).map((artwork) => {
      const {attributes} = artwork;
      const secondToLastBlock = getSecondToLastBlock(artwork);

      return (
        <React.Fragment key={attributes.artworkId!}>
          <ArtMiniDetails
            artworkId={attributes.artworkId!}
            description={attributes.description}
            imageUrl={attributes.imageUrl}
            name={attributes.name}
          />
          <S.AccountLabel accountNumber={secondToLastBlock?.payload.owner} label="From" />
          <S.AccountLabel accountNumber={attributes.owner} label="To" />
          <S.ButtonContainer>{renderButtons(attributes.artworkId!)}</S.ButtonContainer>
        </React.Fragment>
      );
    });
  };

  const renderTabs = () => {
    return (
      <S.Tabs>
        <S.Tab isActive={activeTab === Tab.incoming} onClick={() => setActiveTab(Tab.incoming)}>
          Incoming
        </S.Tab>
        <S.Tab isActive={activeTab === Tab.outgoing} onClick={() => setActiveTab(Tab.outgoing)}>
          Outgoing
        </S.Tab>
      </S.Tabs>
    );
  };

  return (
    <S.Container className={className}>
      {renderTabs()}
      {renderPageContent()}
    </S.Container>
  );
};

export default Transfers;
