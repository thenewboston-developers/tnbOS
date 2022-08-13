import {useDispatch, useSelector} from 'react-redux';

import Icon from 'system/components/Icon';
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

  const handleClick = () => {
    dispatch(setActiveApp(appId));
  };

  const renderIcon = () => {
    return iconType === AppIconType.image ? (
      <img alt={appId} className={className} onClick={handleClick} src={icon} />
    ) : (
      <Icon className={className} onClick={handleClick} icon={icon} unfocusable />
    );
  };

  return (
    <S.ToolbarItem isActiveApp={appId === manager.activeApp} key={appId}>
      {renderIcon()}
    </S.ToolbarItem>
  );
};

export default AppIcon;
