import {useDispatch, useSelector} from 'react-redux';

import {getManager} from 'system/selectors/state';
import {setActiveApp} from 'system/store/manager';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface AppIconProps {
  appId: string;
  icon: string;
}

const AppIcon: SFC<AppIconProps> = ({appId, className, icon}) => {
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);

  const handleClick = () => {
    dispatch(setActiveApp(appId));
  };

  return (
    <S.ToolbarItem isActiveApp={appId === manager.activeApp} key={appId}>
      <img alt={appId} className={className} onClick={handleClick} src={icon} />
    </S.ToolbarItem>
  );
};

export default AppIcon;
