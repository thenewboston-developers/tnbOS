import {useDispatch} from 'react-redux';

import {useDetailsPageArtwork} from 'apps/Art/hooks';
import TransferModal from 'apps/Art/modals/TransferModal';
import {deleteArtwork} from 'apps/Art/store/artworks';
import {setActivePage, setEditPageArtworkId} from 'apps/Art/store/manager';
import {Page} from 'apps/Art/types';
import {useToggle} from 'system/hooks';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const OwnerMenu: SFC = ({className}) => {
  const [transferModalIsOpen, toggleTransferModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const detailsPageArtwork = useDetailsPageArtwork();

  const artworkId = detailsPageArtwork.attributes.artworkId;

  const handleDeleteClick = () => {
    dispatch(setActivePage(Page.myCollection));
    dispatch(deleteArtwork(artworkId!));
    displayToast('Artwork deleted', ToastType.success);
  };

  const handleEditClick = () => {
    dispatch(setEditPageArtworkId(artworkId!));
    dispatch(setActivePage(Page.create));
  };

  const renderTransferModal = () => {
    if (!transferModalIsOpen) return null;
    return <TransferModal artwork={detailsPageArtwork} close={toggleTransferModal} />;
  };

  if (!artworkId) return null;

  return (
    <>
      <S.Container className={className}>
        <S.MenuItem onClick={handleEditClick}>Edit</S.MenuItem>
        <S.MenuItem onClick={toggleTransferModal}>Transfer</S.MenuItem>
        <S.MenuItem onClick={handleDeleteClick}>Delete</S.MenuItem>
      </S.Container>
      {renderTransferModal()}
    </>
  );
};

export default OwnerMenu;
