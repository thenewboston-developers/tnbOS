import {useDispatch, useSelector} from 'react-redux';

import LeftMenuItem from 'apps/University/components/LeftMenuItem';
import {getActivePage} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';

export interface MenuItemProps {
  children: string;
  icon: string;
  page: Page;
}

const MenuItem: SFC<MenuItemProps> = ({children, className, icon, page}) => {
  const activePage = useSelector(getActivePage);
  const dispatch = useDispatch<AppDispatch>();

  const isActivePage = activePage === page;

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  return (
    <LeftMenuItem className={className} icon={icon} isActivePage={isActivePage} onClick={handleClick}>
      {children}
    </LeftMenuItem>
  );
};

export default MenuItem;
