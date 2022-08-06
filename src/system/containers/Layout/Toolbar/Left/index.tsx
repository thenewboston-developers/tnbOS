import {appRegistrations} from 'apps/registry';
import AppIcon from 'system/components/AppIcon';
import ToolbarItem from 'system/components/ToolbarItem';
import Divider from 'system/containers/Layout/Toolbar/Divider';
import {SFC} from 'system/types';
import Avatar from './Avatar';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const renderAppIcons = () => {
    return appRegistrations.map(({appId, icon}) => <AppIcon appId={appId} key={appId} icon={icon} />);
  };

  return (
    <S.Container className={className}>
      <ToolbarItem>
        <Avatar />
      </ToolbarItem>
      <Divider />
      {renderAppIcons()}
    </S.Container>
  );
};

export default Left;
