import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import BuyHome from 'apps/Shop/pages/BuyHome';
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
      [Page.buyHome]: <BuyHome />,
      [Page.sellOrders]: <Sell />,
      [Page.sellProducts]: <Sell />,
      [Page.sellShipping]: <Sell />,
    };

    return pages[activePage];
  };

  return <S.Container className={className}>{renderActivePage()}</S.Container>;
};

export default MainArea;
