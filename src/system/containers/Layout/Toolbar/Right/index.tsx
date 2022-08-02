import {mdiDevTo} from '@mdi/js';

import DropupMenu, {DropupMenuDirection} from 'system/components/DropupMenu';
import {SFC, ToastType} from 'system/types';
import {clearStore} from 'system/utils/ipc';
import {displayToast} from 'system/utils/toast';
import Balance from './Balance';
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

  return (
    <S.Container className={className}>
      <DropupMenu direction={DropupMenuDirection.left} icon={mdiDevTo} options={developmentMenuOptions} />
      <S.ToolbarDivider />
      <Balance />
    </S.Container>
  );
};

export default Right;
