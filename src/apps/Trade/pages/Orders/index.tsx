import {useSelector} from 'react-redux';

import EmptyActiveNetworkPage from 'apps/Trade/components/EmptyActiveNetworkPage';
import EmptyPage from 'apps/Trade/components/EmptyPage';
import PageHeader from 'apps/Trade/components/PageHeader';
import {getActiveNetworkId} from 'apps/Trade/selectors/state';
import {SFC} from 'system/types';
import OrdersEmptyStateGraphic from './assets/orders-empty-state.png';
import * as S from './Styles';

const Orders: SFC = ({className}) => {
  const activeNetworkId = useSelector(getActiveNetworkId);

  const renderEmptyPage = () => {
    if (!activeNetworkId) return <EmptyActiveNetworkPage />;
    return (
      <EmptyPage
        bottomText="All manual and automated orders will appear here."
        graphic={OrdersEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    // TODO: Fix
    if (1) return renderEmptyPage();

    return (
      <S.Container className={className}>
        <PageHeader title="Orders" />
      </S.Container>
    );
  };

  return renderPageContent();
};

export default Orders;
