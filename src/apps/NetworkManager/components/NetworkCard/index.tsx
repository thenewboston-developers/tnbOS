import {mdiDotsVertical} from '@mdi/js';
import noop from 'lodash/noop';

import PopupMenu from 'system/components/DropdownMenu';
import {SFC} from 'system/types';
import * as S from './Styles';

const NetworkCard: SFC = ({className}) => {
  const menuOptions = [
    {label: 'Edit', onClick: noop},
    {label: 'Delete', onClick: noop},
  ];

  return (
    <S.Container className={className}>
      <S.Left>
        <S.NetworkLogo isOnline={true} />
        <S.LeftText>
          <S.NetworkId>thenewboston.network</S.NetworkId>
          <S.DisplayName>TNB</S.DisplayName>
        </S.LeftText>
      </S.Left>
      <S.Right>
        <PopupMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.Right>
    </S.Container>
  );
};

export default NetworkCard;
