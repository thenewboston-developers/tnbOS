import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import SellHome from 'apps/Shop/pages/SellHome';
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
      [Page.buyHome]: null,
      [Page.sellHome]: <SellHome />,
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
