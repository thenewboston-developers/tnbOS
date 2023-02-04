import {useDispatch, useSelector} from 'react-redux';

import {TradeRegistration} from 'apps/Trade/registration';
import {getActivePage} from 'apps/Trade/selectors/state';
import {setActivePage} from 'apps/Trade/store/manager';
import {Page} from 'apps/Trade/types';
import {useNotificationCount} from 'system/hooks';
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
  const notificationCount = useNotificationCount(TradeRegistration.appId);

  const isActivePage = activePage === page;

  const handleClick = () => {
    dispatch(setActivePage(page));
  };

  const renderNotificationCountContainer = () => {
    if (!notificationCount || page !== Page.orders) return null;

    return (
      <S.NotificationCountContainer>
        <S.NotificationCount>{notificationCount}</S.NotificationCount>
      </S.NotificationCountContainer>
    );
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Left>
        <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
        <S.Text $isActivePage={isActivePage}>{text}</S.Text>
      </S.Left>
      {renderNotificationCountContainer()}
    </S.Container>
  );
};

export default MenuItem;
