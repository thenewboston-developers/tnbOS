import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import Offers from 'apps/Trade/pages/Offers';
import Wallets from 'apps/Trade/pages/Wallets';
import {getActivePage} from 'apps/Trade/selectors/state';
import {Page} from 'apps/Trade/types';
import {SFC} from 'system/types';
import * as S from './Styles';

type PageDict = {
  [key in Page]: ReactNode;
};

const Right: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.buy]: <div>Buy</div>,
      [Page.offers]: <Offers />,
      [Page.orders]: <div>Orders</div>,
      [Page.sell]: <div>Sell</div>,
      [Page.wallets]: <Wallets />,
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
