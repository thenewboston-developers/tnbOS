import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import SellOrders from 'apps/Shop/pages/SellOrders';
import SellProductDetails from 'apps/Shop/pages/SellProductDetails';
import SellProducts from 'apps/Shop/pages/SellProducts';
import SellShipping from 'apps/Shop/pages/SellShipping';
import {getActivePage} from 'apps/Shop/selectors/state';
import {Page} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

type PageDict = {
  [key in Page]: ReactNode;
};

const Right: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.buyAddressDetails]: null,
      [Page.buyAddresses]: null,
      [Page.buyHome]: null,
      [Page.buyProductDetails]: null,
      [Page.sellOrders]: <SellOrders />,
      [Page.sellProductDetails]: <SellProductDetails />,
      [Page.sellProducts]: <SellProducts />,
      [Page.sellShipping]: <SellShipping />,
    };

    return pages[activePage];
  };

  return (
    <S.Container className={className}>
      <S.MainContent>{renderActivePage()}</S.MainContent>
    </S.Container>
  );
};

export default Right;
