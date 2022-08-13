import {appRegistrations} from 'apps/registry';
import AppIcon from 'system/components/AppIcon';
import {SFC} from 'system/types';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const renderAppIcons = () => {
    return appRegistrations
      .filter(({isSystemApp}) => !isSystemApp)
      .map(({appId, icon, iconType}) => <AppIcon appId={appId} key={appId} icon={icon} iconType={iconType} />);
  };

  return <S.Container className={className}>{renderAppIcons()}</S.Container>;
};

export default Left;
