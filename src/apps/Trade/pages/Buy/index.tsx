import {useSelector} from 'react-redux';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import PageHeader from 'apps/Trade/components/PageHeader';
import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {SFC} from 'system/types';
import BuyEmptyStateGraphic from './assets/buy-empty-state.png';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;
    return (
      <EmptyPage
        bottomText="Buy offers from contacts will appear here."
        graphic={BuyEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    // TODO: Fix
    if (1) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Buy" />
      </S.Container>
    );
  };

  return renderPageContent();
};

export default Buy;
