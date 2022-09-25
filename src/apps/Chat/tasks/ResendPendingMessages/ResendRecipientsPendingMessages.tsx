import {Component} from 'react';
import {connect} from 'react-redux';

import {setMessageBlock} from 'apps/Chat/blocks';
import {
  MAX_MESSAGE_DELIVERY_ATTEMPTS,
  RESEND_PENDING_MESSAGES_TASK_RUN_INTERVAL_SECONDS,
} from 'apps/Chat/constants/protocol';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {Deliveries, DeliveryStatus, Messages} from 'apps/Chat/types';
import {AppDispatch, Balances, NetworkAccountOnlineStatuses, RootState} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

export interface ResendRecipientsPendingMessagesProps {
  balances: Balances;
  deliveries: Deliveries;
  dispatch: AppDispatch;
  messages: Messages;
  networkAccountOnlineStatuses: NetworkAccountOnlineStatuses;
  recipient: string;
}

class ResendRecipientsPendingMessages extends Component<ResendRecipientsPendingMessagesProps> {
  runInterval: any;

  componentDidMount() {
    this.run();
    this.runInterval = setInterval(() => this.run(), RESEND_PENDING_MESSAGES_TASK_RUN_INTERVAL_SECONDS * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.runInterval);
  }

  getPendingMessages = () => {
    const {deliveries, messages, recipient} = this.props;
    return Object.values(messages)
      .filter((message) => message.recipient === recipient)
      .filter(({messageId}) => {
        const delivery = deliveries[messageId];
        if (!delivery) return false;
        return delivery.attempts < MAX_MESSAGE_DELIVERY_ATTEMPTS && delivery.status === DeliveryStatus.pending;
      });
  };

  run = () => {
    const {balances, deliveries, dispatch, networkAccountOnlineStatuses, recipient} = this.props;

    const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
      balances,
      networkAccountOnlineStatuses,
      recipient,
    });

    if (!recipientsDefaultNetworkId) return;

    (async () => {
      const pendingMessages = this.getPendingMessages();

      for (const message of pendingMessages) {
        const messageId = message.messageId;

        try {
          await setMessageBlock({
            amount: 0,
            networkId: recipientsDefaultNetworkId,
            params: message,
            recipient: message.recipient,
          });

          const delivery = deliveries[messageId];

          dispatch(
            setDelivery({
              delivery: {
                attempts: delivery.attempts + 1,
                status: DeliveryStatus.pending,
              },
              messageId,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      }
    })();
  };

  render() {
    return null;
  }
}

export default connect((state: RootState) => ({
  balances: state.system.balances,
  deliveries: state.chat.deliveries,
  messages: state.chat.messages,
  networkAccountOnlineStatuses: state.system.networkAccountOnlineStatuses,
}))(ResendRecipientsPendingMessages);
