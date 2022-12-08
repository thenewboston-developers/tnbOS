import {useDispatch} from 'react-redux';

import {setActivePage} from 'apps/Art/store/manager';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const TopNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleMenuItemClick = (page: Page) => {
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
