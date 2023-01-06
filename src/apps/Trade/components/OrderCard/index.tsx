import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiChevronDown} from '@mdi/js';

import Badge, {BadgeStyle} from 'apps/Trade/components/Badge';
import OrderCardBottom from 'apps/Trade/components/OrderCardBottom';
import {getActiveNetworkId, getOrderErrors, getResolutions} from 'apps/Trade/selectors/state';
import {ApprovalStatus, FillStatus, Order, PaymentStatus, ResolutionStatus} from 'apps/Trade/types';
import {useToggle} from 'system/hooks';
import {getNetworks, getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

interface OrderCardProps {
  order: Order;
}

enum OrderType {
  clientPurchase = 'clientPurchase',
  clientSale = 'clientSale',
  hostPurchase = 'hostPurchase',
  hostSale = 'hostSale',
}

const OrderCard: SFC<OrderCardProps> = ({className, order}) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const networks = useSelector(getNetworks);
  const orderErrors = useSelector(getOrderErrors);
  const resolutions = useSelector(getResolutions);
  const self = useSelector(getSelf);

  const {approvalStatus, client, createdDate, fillStatus, host, paymentStatus} = order;

  const isClient = useMemo(() => {
    return client.accountNumber === self.accountNumber;
  }, [client.accountNumber, self.accountNumber]);

  const errors = useMemo(() => {
    return orderErrors[order.orderId];
  }, [order.orderId, orderErrors]);

  const orderResolution = useMemo(() => {
    return resolutions[order.orderId];
  }, [order.orderId, resolutions]);

  const orderType = useMemo(() => {
    if (isClient) {
      return client.outgoingAsset === activeNetworkId ? OrderType.clientPurchase : OrderType.clientSale;
    }
    return host.outgoingAsset === activeNetworkId ? OrderType.hostPurchase : OrderType.hostSale;
  }, [activeNetworkId, client.outgoingAsset, host.outgoingAsset, isClient]);

  const isPurchase = useMemo(() => {
    return [OrderType.clientPurchase, OrderType.hostPurchase].includes(orderType);
  }, [orderType]);

  const getNetworkDisplayName = useCallback(
    (networkId: string) => {
      const network = networks[networkId];
      const results = network?.displayName || networkId;
      return truncate(results, 16);
    },
    [networks],
  );

  const getDisplayDate = () => {
    const date = new Date(createdDate);
    return date.toLocaleDateString(undefined, {dateStyle: 'long'});
  };

  const getDisplayTime = () => {
    const date = new Date(createdDate);
    return date.toLocaleTimeString(undefined, {timeStyle: 'short'});
  };

  const renderAmount = () => {
    const isClientBuyingAsset = client.outgoingAsset === activeNetworkId;
    const amount = isClientBuyingAsset ? client.outgoingAmount : host.outgoingAmount;
    const networkId = isClientBuyingAsset ? client.outgoingAsset : host.outgoingAsset;
    return <S.Amount amount={amount} bottomText={isPurchase ? 'Total Cost' : 'Total Price'} networkId={networkId} />;
  };

  const renderAssetLogo = () => {
    const isClientBuyingAsset = client.outgoingAsset === activeNetworkId;
    const amount = isClientBuyingAsset ? host.outgoingAmount : client.outgoingAmount;
    const networkId = isClientBuyingAsset ? host.outgoingAsset : client.outgoingAsset;
    const networkDisplayName = getNetworkDisplayName(networkId);
    const topText = `${isClient ? 'Client' : 'Host'} ${isPurchase ? 'Purchase' : 'Sale'}`;
    return (
      <S.AssetLogo
        bottomText={`${amount.toLocaleString()} ${networkDisplayName}`}
        networkId={networkId}
        topText={topText}
      />
    );
  };

  const renderBottom = () => {
    if (!expanded) return null;
    return <OrderCardBottom order={order} />;
  };

  const renderMainBadge = () => {
    if (errors) return <Badge badgeStyle={BadgeStyle.danger} text="Error" />;

    if (paymentStatus === PaymentStatus.none && fillStatus === FillStatus.none) {
      const approvalStatusBadges = {
        [ApprovalStatus.approved]: <Badge badgeStyle={BadgeStyle.info} text="Awaiting Payment" />,
        [ApprovalStatus.error]: <Badge badgeStyle={BadgeStyle.danger} text="Approval Error" />,
        [ApprovalStatus.expired]: <Badge badgeStyle={BadgeStyle.dark} text="Approval Window Expired" />,
        [ApprovalStatus.pending]: <Badge badgeStyle={BadgeStyle.info} text="Pending Approval" />,
      };
      return approvalStatusBadges[approvalStatus];
    }

    if (fillStatus === FillStatus.none) {
      const paymentStatusBadges = {
        [PaymentStatus.complete]: <Badge badgeStyle={BadgeStyle.primary} text="Awaiting Fulfillment" />,
        [PaymentStatus.error]: <Badge badgeStyle={BadgeStyle.danger} text="Payment Error" />,
        [PaymentStatus.expired]: <Badge badgeStyle={BadgeStyle.dark} text="Payment Window Expired" />,
        [PaymentStatus.none]: <Badge badgeStyle={BadgeStyle.info} text="Awaiting Payment" />,
        [PaymentStatus.partial]: <Badge badgeStyle={BadgeStyle.info} text="Awaiting Payment" />,
      };
      return paymentStatusBadges[paymentStatus];
    }

    const fillStatusBadges = {
      [FillStatus.complete]: <Badge badgeStyle={BadgeStyle.success} text="Filled" />,
      [FillStatus.none]: <Badge badgeStyle={BadgeStyle.primary} text="Awaiting Fulfillment" />,
      [FillStatus.partial]: <Badge badgeStyle={BadgeStyle.primary} text="Awaiting Fulfillment" />,
    };
    return fillStatusBadges[fillStatus];
  };

  const renderParticipant = () => {
    const description = isPurchase ? 'Seller' : 'Buyer';
    const accountNumber = isClient ? host.accountNumber : client.accountNumber;
    return <S.User accountNumber={accountNumber} description={description} />;
  };

  const renderResolutionBadge = () => {
    if (!orderResolution) return null;
    const resolutionStatusBadges = {
      [ResolutionStatus.cancelled]: <S.ResolutionBadge badgeStyle={BadgeStyle.danger} text="Cancelled" />,
      [ResolutionStatus.filled]: <S.ResolutionBadge badgeStyle={BadgeStyle.info} text="Resolved" />,
      [ResolutionStatus.unresolved]: <S.ResolutionBadge badgeStyle={BadgeStyle.danger} text="Resolution Required" />,
    };
    return resolutionStatusBadges[orderResolution.resolutionStatus];
  };

  return (
    <S.Container className={className}>
      <S.Top onClick={toggleExpanded}>
        <S.DateContainer>
          <S.Date>{getDisplayDate()}</S.Date>
          <S.Time>{getDisplayTime()}</S.Time>
        </S.DateContainer>
        {renderAssetLogo()}
        {renderParticipant()}
        {renderAmount()}
        <S.BadgeContainer>
          {renderResolutionBadge()}
          {renderMainBadge()}
        </S.BadgeContainer>
        <S.MdiIcon $expanded={expanded} path={mdiChevronDown} size="20px" />
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default OrderCard;
