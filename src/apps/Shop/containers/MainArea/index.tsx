import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import BuyHome from 'apps/Shop/pages/BuyHome';
import SellHome from 'apps/Shop/pages/SellHome';
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
      [Page.sellHome]: <SellHome />,
    };

    return pages[activePage];
  };

  return <S.Container className={className}>{renderActivePage()}</S.Container>;
};

export default MainArea;
