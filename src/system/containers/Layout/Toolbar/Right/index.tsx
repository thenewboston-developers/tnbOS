import {mdiDevTo} from '@mdi/js';

import {appRegistrations} from 'apps/registry';
import {IpcChannel} from 'shared/types';
import AppIcon from 'system/components/AppIcon';
import DropupMenu, {DropupMenuDirection} from 'system/components/DropupMenu';
import {useReadIpc, useWriteIpc} from 'system/hooks';
import {SFC, ToastType} from 'system/types';
import {clearStore, restartApp} from 'system/utils/ipc';
import {displayToast} from 'system/utils/toast';
import Avatar from './Avatar';
import Divider from './Divider';
import QrIcon from './QrIcon';
import * as S from './Styles';

const exportStoreDataFailToast = (_: any, errorMessage: string) => {
  displayToast(`Could not export store data: ${errorMessage}`, ToastType.error);
};

const exportStoreDataSuccessToast = () => {
  displayToast('Store data exported successfully', ToastType.success);
};

const importStoreDataFailToast = (_: any, errorMessage: string) => {
  displayToast(`Could not import Store Data: ${errorMessage}`, ToastType.error);
};

const Right: SFC = ({className}) => {
  const handleClearStore = () => {
    clearStore();
    displayToast('Store cleared', ToastType.success);
  };

  const handleExportStoreData = useWriteIpc({
    channel: IpcChannel.exportStoreData,
    failCallback: exportStoreDataFailToast,
    successCallback: exportStoreDataSuccessToast,
  });

  const handleImportStoreData = useReadIpc({
    channel: IpcChannel.importStoreData,
    failCallback: importStoreDataFailToast,
    successCallback: restartApp,
  });

  const handleShowToast = () => {
    displayToast('Sample toast message', ToastType.success);
  };

  const developmentMenuOptions = [
    {label: 'Clear Store', onClick: handleClearStore},
    {label: 'Export Store Data', onClick: handleExportStoreData},
    {label: 'Import Store Data', onClick: handleImportStoreData},
    {label: 'Show Toast', onClick: handleShowToast},
  ];

  const renderAppIcons = () => {
    return appRegistrations
      .filter(({isSystemApp}) => isSystemApp)
      .map(({appId, icon, iconType}) => <AppIcon appId={appId} icon={icon} iconType={iconType} key={appId} />);
  };

  return (
    <S.Container className={className}>
      {renderAppIcons()}
      <Divider />
      <DropupMenu direction={DropupMenuDirection.left} icon={mdiDevTo} options={developmentMenuOptions} />
      <QrIcon />
      <Avatar />
    </S.Container>
  );
};

export default Right;
