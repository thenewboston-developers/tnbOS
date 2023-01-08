import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import ActiveNetworkBar from 'apps/Trade/containers/ActiveNetworkBar';
import Buy from 'apps/Trade/pages/Buy';
import Offers from 'apps/Trade/pages/Offers';
import Orders from 'apps/Trade/pages/Orders';
import Sell from 'apps/Trade/pages/Sell';
import Wallets from 'apps/Trade/pages/Wallets';
import {getActiveNetworkId, getActivePage} from 'apps/Trade/selectors/state';
import {Page} from 'apps/Trade/types';
import {SFC} from 'system/types';
import * as S from './Styles';

type PageDict = {
  [key in Page]: ReactNode;
};

const Right: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.buy]: <Buy />,
      [Page.offers]: <Offers />,
      [Page.orders]: <Orders />,
      [Page.sell]: <Sell />,
      [Page.wallets]: <Wallets />,
    };

    return pages[activePage];
  };

  const renderActiveNetworkBar = () => {
    if (!activeNetworkId) return null;
    if (![Page.buy, Page.offers, Page.orders, Page.sell].includes(activePage)) return null;
    return <ActiveNetworkBar />;
  };

  return (
    <S.Container className={className}>
      {renderActiveNetworkBar()}
      <S.MainContent>{renderActivePage()}</S.MainContent>
    </S.Container>
  );
};

export default Right;
