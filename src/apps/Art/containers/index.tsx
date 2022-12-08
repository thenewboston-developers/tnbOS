import {useSelector} from 'react-redux';

import Create from 'apps/Art/containers/Create';
import Home from 'apps/Art/containers/Home';
import MyCollection from 'apps/Art/containers/MyCollection';
import TopNav from 'apps/Art/containers/TopNav';
import Transfers from 'apps/Art/containers/Transfers';
import {getActivePage} from 'apps/Art/selectors/state';
import {Page} from 'apps/Art/types';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const Art: SFC<AppProps> = ({className, display}) => {
  const activePage = useSelector(getActivePage);

  const renderPage = () => {
    const pages = {
      [Page.create]: <Create />,
      [Page.home]: <Home />,
      [Page.myCollection]: <MyCollection />,
      [Page.transfers]: <Transfers />,
    };

    return pages[activePage];
  };

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <TopNav />
        {renderPage()}
      </S.Container>
    </AppWindow>
  );
};

export default Art;
