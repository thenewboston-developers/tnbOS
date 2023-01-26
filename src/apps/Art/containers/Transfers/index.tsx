import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import ArtMiniDetails from 'apps/Art/components/ArtMiniDetails';
import OutlineButton, {ButtonColor} from 'apps/Art/components/OutlineButton';
import {useIncomingTransferArtworks, useOutgoingTransferArtworks} from 'apps/Art/hooks';
import {setQueuedBlock, unsetArtwork} from 'apps/Art/store/artworks';
import {UnsignedStandardBlock} from 'apps/Art/types';
import {getSecondToLastBlock} from 'apps/Art/utils/blocks';
import NetworksEmptyStateGraphic from 'apps/NetworkManager/assets/networks-empty-state.png';
import EmptyPage from 'system/components/EmptyPage';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {signData} from 'system/utils/signing';
import {verifySignature} from 'system/utils/tnb';
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
  const self = useSelector(getSelf);

  const artworks = useMemo(() => {
    return activeTab === Tab.incoming ? incomingTransferArtworks : outgoingTransferArtworks;
  }, [activeTab, incomingTransferArtworks, outgoingTransferArtworks]);

  const handleAcceptClick = (artworkId: string) => {
    const artwork = artworks[artworkId!];

    const unsignedStandardBlock: UnsignedStandardBlock = {
      payload: {
        artworkId: artworkId!,
        blockId: artwork.headBlockSignature!,
        inTransfer: false,
        modifiedDate: currentSystemDate(),
        owner: self.accountNumber,
      },
    };

    const signedStandardBlockPayload = signData(unsignedStandardBlock.payload, self.signingKey);
    const standardBlockSignature = signedStandardBlockPayload.signature;

    const block = {
      ...unsignedStandardBlock,
      signature: standardBlockSignature,
    };

    verifySignature({
      accountNumber: self.accountNumber,
      signature: block.signature,
      unsignedData: block.payload,
    });

    dispatch(setQueuedBlock(block));
  };

  const handleDeleteClick = (artworkId: string) => {
    dispatch(unsetArtwork(artworkId));
    displayToast('Artwork deleted', ToastType.success);
  };

  const renderButtons = (artworkId: string) => {
    if (activeTab === Tab.incoming) {
      return (
        <>
          <OutlineButton color={ButtonColor.danger} onClick={() => {}} text="Decline" />
          <OutlineButton color={ButtonColor.success} onClick={() => handleAcceptClick(artworkId)} text="Accept" />
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
