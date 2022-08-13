import {mdiDevTo} from '@mdi/js';

import {appRegistrations} from 'apps/registry';
import AppIcon from 'system/components/AppIcon';
import DropupMenu, {DropupMenuDirection} from 'system/components/DropupMenu';
import ToolbarItem from 'system/components/ToolbarItem';
import Divider from 'system/containers/Layout/Toolbar/Divider';
import {SFC, ToastType} from 'system/types';
import {clearStore} from 'system/utils/ipc';
import {displayToast} from 'system/utils/toast';
import Avatar from './Avatar';
import QrIcon from './QrIcon';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const handleClearStore = () => {
    clearStore();
    displayToast('Store cleared', ToastType.success);
  };

  const handleShowToast = () => {
    displayToast('Noice', ToastType.success);
  };

  const developmentMenuOptions = [
    {label: 'Clear Store', onClick: handleClearStore},
    {label: 'Show Toast', onClick: handleShowToast},
  ];

  const renderAppIcons = () => {
    return appRegistrations
      .filter(({isSystemApp}) => isSystemApp)
      .map(({appId, icon, iconType}) => <AppIcon appId={appId} key={appId} icon={icon} iconType={iconType} />);
  };

  return (
    <S.Container className={className}>
      {renderAppIcons()}
      <Divider />
      <DropupMenu direction={DropupMenuDirection.left} icon={mdiDevTo} options={developmentMenuOptions} />
      <ToolbarItem>
        <QrIcon />
      </ToolbarItem>
      <ToolbarItem>
        <Avatar />
      </ToolbarItem>
    </S.Container>
  );
};

export default Right;
