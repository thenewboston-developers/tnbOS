import {useDispatch, useSelector} from 'react-redux';

import {setActivePage, setCanvasArtworkId} from 'apps/Art/store/manager';
import {getCanvasArtworkId} from 'apps/Art/selectors/state';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const canvasArtworkId = useSelector(getCanvasArtworkId);
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuItemClick = (page: Page) => {
    if (page === Page.canvas && canvasArtworkId) {
      dispatch(setCanvasArtworkId(null));
    }

    dispatch(setActivePage(page));
  };

  return (
    <S.Container className={className}>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.home)}>Home</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.myCollection)}>My Collection</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.transfers)}>Transfers</S.MenuItem>
      <S.MenuItem onClick={() => handleMenuItemClick(Page.canvas)}>Canvas</S.MenuItem>
    </S.Container>
  );
};

export default TopNav;
