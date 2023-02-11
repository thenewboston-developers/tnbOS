import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import BuyAddressDetails from 'apps/Shop/pages/BuyAddressDetails';
import BuyAddresses from 'apps/Shop/pages/BuyAddresses';
import BuyHome from 'apps/Shop/pages/BuyHome';
import BuyOrders from 'apps/Shop/pages/BuyOrders';
import BuyProductDetails from 'apps/Shop/pages/BuyProductDetails';
import Sell from 'apps/Shop/pages/Sell';
import {getActivePage} from 'apps/Shop/selectors/state';
import {Page} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

type PageDict = {
  [key in Page]: ReactNode;
};

const MainArea: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.buyAddressDetails]: <BuyAddressDetails />,
      [Page.buyAddresses]: <BuyAddresses />,
      [Page.buyHome]: <BuyHome />,
      [Page.buyOrders]: <BuyOrders />,
      [Page.buyProductDetails]: <BuyProductDetails />,
      [Page.sellOrders]: <Sell />,
      [Page.sellProductDetails]: <Sell />,
      [Page.sellProducts]: <Sell />,
      [Page.sellShipping]: <Sell />,
    };

    return pages[activePage];
  };

  return <S.Container className={className}>{renderActivePage()}</S.Container>;
};

export default MainArea;
