import {useDispatch, useSelector} from 'react-redux';

import LeftMenuItem from 'apps/University/components/LeftMenuItem';
import {getActivePage} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import {useMemo} from 'react';

export interface MenuItemProps {
  children: string;
  icon: string;
  isCollapsed: boolean;
  page: Page;
}

const MenuItem: SFC<MenuItemProps> = ({children, className, icon, isCollapsed, page}) => {
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch<AppDispatch>();

  const isActivePage = useMemo(() => {
    if (page === activePage) return true;

    if (page === Page.teachCourseLectures) {
      if (activePage === Page.teachCourseLectureDetails) return true;
    }

    return false;
  }, [activePage, page]);

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  return (
    <LeftMenuItem
      className={className}
      icon={icon}
      isActivePage={isActivePage}
      isCollapsed={isCollapsed}
      onClick={handleClick}
    >
      {children}
    </LeftMenuItem>
  );
};

export default MenuItem;
