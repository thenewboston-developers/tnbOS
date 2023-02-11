import {mdiDotsVertical} from '@mdi/js';

import DropdownMenu from 'system/components/DropdownMenu';
import {SFC} from 'system/types';
import * as S from './Styles';

const Address: SFC = ({className}) => {
  const menuOptions = [
    {label: 'Edit', onClick: () => {}},
    {label: 'Delete', onClick: () => {}},
    {label: 'Set as Default', onClick: () => {}},
  ];

  return (
    <S.Container className={className}>
      <S.Left>
        <div>Bucky Roberts</div>
        <div>845 Willow Road</div>
        <div>Alabama City, NY</div>
        <div>88210</div>
        <div>United States</div>
      </S.Left>
      <S.Right>
        <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
      </S.Right>
    </S.Container>
  );
};

export default Address;
