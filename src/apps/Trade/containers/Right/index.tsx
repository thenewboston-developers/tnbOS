import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import ActiveNetworkBar from 'apps/Trade/containers/ActiveNetworkBar';
import Offers from 'apps/Trade/pages/Offers';
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
      [Page.buy]: <div>Buy</div>,
      [Page.offers]: <Offers />,
      [Page.orders]: <div>Orders</div>,
      [Page.sell]: <div>Sell</div>,
      [Page.wallets]: <Wallets />,
    };

    return pages[activePage];
  };

  const renderActiveNetworkBar = () => {
    if (!activeNetworkId) return null;
    if (![Page.buy, Page.offers, Page.sell].includes(activePage)) return null;
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
