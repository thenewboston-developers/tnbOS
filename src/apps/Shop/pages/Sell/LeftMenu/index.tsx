import {mdiInboxArrowDown, mdiTag, mdiTruck} from '@mdi/js';

import LeftMenuItem from 'apps/Shop/components/LeftMenuItem';
import {Page} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const LeftMenu: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftMenuItem icon={mdiTag} page={Page.sellProducts}>
        Products
      </LeftMenuItem>
      <LeftMenuItem icon={mdiInboxArrowDown} page={Page.sellOrders}>
        Orders
      </LeftMenuItem>
      <LeftMenuItem icon={mdiTruck} page={Page.sellShipping}>
        Shipping
      </LeftMenuItem>
    </S.Container>
  );
};

export default LeftMenu;
