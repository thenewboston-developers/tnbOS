import {useDispatch, useSelector} from 'react-redux';

import {getActivePage} from 'apps/Shop/selectors/state';
import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuItemProps {
  children: string;
  icon: string;
  page: Page;
}

const LeftMenuItem: SFC<LeftMenuItemProps> = ({children, className, icon, page}) => {
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  const isActivePage = activePage === page;

  return (
    <S.Container $isActivePage={isActivePage} className={className} onClick={handleClick}>
      <S.Icon path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage}>{children}</S.Text>
    </S.Container>
  );
};

export default LeftMenuItem;
