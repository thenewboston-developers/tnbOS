import {useDispatch, useSelector} from 'react-redux';

import {getActivePage} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface MenuItemProps {
  icon: string;
  page: Page;
  text: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, icon, page, text}) => {
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch<AppDispatch>();

  const isActivePage = activePage === page;

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage}>{text}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
