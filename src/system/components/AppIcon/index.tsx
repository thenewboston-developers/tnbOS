import {useDispatch, useSelector} from 'react-redux';

import Icon from 'system/components/Icon';
import {useNotificationCount} from 'system/hooks';
import {getManager} from 'system/selectors/state';
import {setActiveApp} from 'system/store/manager';
import {AppDispatch, AppIconType, SFC} from 'system/types';
import * as S from './Styles';

export interface AppIconProps {
  appId: string;
  icon: string;
  iconType: AppIconType;
}

const AppIcon: SFC<AppIconProps> = ({appId, className, icon, iconType}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const notificationCount = useNotificationCount(appId);

  const handleClick = () => {
    dispatch(setActiveApp(appId));
  };

  const renderIcon = () => {
    const icons = {
      [AppIconType.image]: <img alt={appId} className={className} onClick={handleClick} src={icon} />,
      [AppIconType.path]: <Icon className={className} icon={icon} onClick={handleClick} unfocusable />,
    };
    return icons[iconType];
  };

  const renderNotificationCount = () => {
    if (!notificationCount) return null;
    return <S.NotificationCount>{notificationCount}</S.NotificationCount>;
  };

  return (
    <S.ToolbarItem isActiveApp={appId === manager.activeApp} key={appId}>
      {renderIcon()}
      {renderNotificationCount()}
    </S.ToolbarItem>
  );
};

export default AppIcon;
