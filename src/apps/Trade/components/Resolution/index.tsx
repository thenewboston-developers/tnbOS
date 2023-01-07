import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiAlertOutline, mdiCancel, mdiCheck} from '@mdi/js';

import Button from 'apps/Trade/components/Button';
import {ButtonColor} from 'apps/Trade/components/Button/types';
import {getHoldingAccounts, getResolutions} from 'apps/Trade/selectors/state';
import {setResolution} from 'apps/Trade/store/resolutions';
import {Order, ResolutionStatus} from 'apps/Trade/types';
import {removeHold} from 'apps/Trade/utils/holdingAccounts';
import {handleOrderError} from 'apps/Trade/utils/orderErrors';
import {handleOrderFulfillment} from 'apps/Trade/utils/orderProcessing';
import {useRecipientsDefaultNetworkId} from 'system/hooks';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayErrorToast, displayToast} from 'system/utils/toast';
import * as S from './Styles';

interface ResolutionProps {
  order: Order;
}

const Resolution: SFC<ResolutionProps> = ({className, order}) => {
  const dispatch = useDispatch<AppDispatch>();
  const holdingAccounts = useSelector(getHoldingAccounts);
  const recipientsDefaultNetworkId = useRecipientsDefaultNetworkId(order.client.accountNumber);
  const resolutions = useSelector(getResolutions);

  const orderResolution = useMemo(() => {
    return resolutions[order.orderId];
  }, [order.orderId, resolutions]);

  if (!orderResolution || orderResolution.resolutionStatus !== ResolutionStatus.unresolved) return null;

  const handleCancelOrderClick = async () => {
    try {
      const resolutionStatus = ResolutionStatus.cancelled;
      dispatch(
        setResolution({
          orderId: order.orderId,
          resolutionStatus,
        }),
      );
      await removeHold({
        holdingAccounts,
        order,
        orderFilled: false,
      });
      displayToast('Order cancelled', ToastType.success);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error cancelling the order');
      if (!recipientsDefaultNetworkId) return;
      handleOrderError({
        err: error,
        networkId: recipientsDefaultNetworkId,
        orderId: order.orderId,
        recipient: order.client.accountNumber,
      });
    }
  };

  const handleFillOrderClick = async () => {
    if (!recipientsDefaultNetworkId) {
      displayErrorToast('Error filling the order, unable to determine connection with recipient');
      return;
    }

    try {
      await handleOrderFulfillment({
        holdingAccounts,
        networkId: recipientsDefaultNetworkId,
        order,
      });
      dispatch(
        setResolution({
          orderId: order.orderId,
          resolutionStatus: ResolutionStatus.filled,
        }),
      );
      displayToast('Order filled', ToastType.success);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error filling the order');
      handleOrderError({
        err: error,
        networkId: recipientsDefaultNetworkId,
        orderId: order.orderId,
        recipient: order.client.accountNumber,
      });
    }
  };

  const renderHeading = () => (
    <S.Heading>
      <S.Icon path={mdiAlertOutline} size="20px" />
      <S.HeadingText>Resolution Required</S.HeadingText>
    </S.Heading>
  );

  const renderOptionsContainer = () => {
    return (
      <S.OptionsContainer>
        <S.Option>
          <Button
            color={ButtonColor.danger}
            iconLeft={mdiCancel}
            onClick={handleCancelOrderClick}
            text="Cancel Order"
          />
          <S.ButtonHelperText>Release funds back to your account</S.ButtonHelperText>
        </S.Option>
        <S.Option>
          <Button color={ButtonColor.success} iconLeft={mdiCheck} onClick={handleFillOrderClick} text="Fill Order" />
          <S.ButtonHelperText>Send funds to counterparty</S.ButtonHelperText>
        </S.Option>
      </S.OptionsContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Panel>
        {renderHeading()}
        <S.PanelBody>
          The payment could not be confirmed before the expiration date. What would you like to do?
        </S.PanelBody>
        {renderOptionsContainer()}
      </S.Panel>
    </S.Container>
  );
};

export default Resolution;
