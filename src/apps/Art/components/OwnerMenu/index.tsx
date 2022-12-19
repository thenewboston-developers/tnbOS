import {useDispatch} from 'react-redux';

import {useDetailsPageArtwork} from 'apps/Art/hooks';
import {deleteArtwork} from 'apps/Art/store/artworks';
import {setActivePage, setEditPageArtworkId} from 'apps/Art/store/manager';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const OwnerMenu: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const detailsPageArtwork = useDetailsPageArtwork();

  const artworkId = detailsPageArtwork.attributes.artworkId;

  const handleDeleteClick = () => {
    if (!artworkId) return;
    dispatch(setActivePage(Page.myCollection));
    dispatch(deleteArtwork(artworkId));
    displayToast('Artwork deleted', ToastType.success);
  };

  const handleEditClick = () => {
    if (!artworkId) return;
    dispatch(setEditPageArtworkId(artworkId));
    dispatch(setActivePage(Page.create));
  };

  return (
    <S.Container className={className}>
      <S.MenuItem onClick={handleEditClick}>Edit</S.MenuItem>
      <S.MenuItem onClick={handleDeleteClick}>Delete</S.MenuItem>
    </S.Container>
  );
};

export default OwnerMenu;
