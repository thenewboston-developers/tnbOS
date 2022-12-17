import {useDispatch, useSelector} from 'react-redux';

import {setActivePage, setEditPageArtworkId} from 'apps/Art/store/manager';
import {getEditPageArtworkId} from 'apps/Art/selectors/state';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const editPageArtworkId = useSelector(getEditPageArtworkId);

  const handleMenuItemClick = (page: Page) => {
    if (page === Page.create && editPageArtworkId) {
      dispatch(setEditPageArtworkId(null));
    }

    dispatch(setActivePage(page));
  };

  return (
    <S.Container className={className}>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.home)}>Home</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.myCollection)}>My Collection</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.transfers)}>Transfers</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.create)}>Create</S.MenuItem>
    </S.Container>
  );
};

export default TopNav;
