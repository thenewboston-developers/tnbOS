import {useDispatch} from 'react-redux';

import {useDetailsPageArtwork} from 'apps/Art/hooks';
import {setActivePage, setEditPageArtworkId} from 'apps/Art/store/manager';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const OwnerMenu: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const detailsPageArtwork = useDetailsPageArtwork();

  const handleEditClick = () => {
    if (!detailsPageArtwork.attributes.artworkId) return;
    dispatch(setEditPageArtworkId(detailsPageArtwork.attributes.artworkId));
    dispatch(setActivePage(Page.create));
  };

  return (
    <S.Container className={className}>
      <S.MenuItem onClick={handleEditClick}>Edit</S.MenuItem>
      <S.MenuItem>Delete</S.MenuItem>
    </S.Container>
  );
};

export default OwnerMenu;
