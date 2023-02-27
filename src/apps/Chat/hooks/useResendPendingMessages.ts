import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setMessageBlock} from 'apps/Chat/blocks';
import {
  MAX_MESSAGE_DELIVERY_ATTEMPTS,
  RESEND_PENDING_MESSAGES_TASK_RUN_INTERVAL_SECONDS,
} from 'apps/Chat/constants/protocol';
import {getContacts, getDeliveries, getMessages} from 'apps/Chat/selectors/state';
import {setDelivery} from 'apps/Chat/store/deliveries';
import {DeliveryStatus} from 'apps/Chat/types';
import {getAccountOnlineStatuses, getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {AppDispatch, OnlineStatus} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

const useResendPendingMessages = () => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const balances = useSelector(getBalances);
  const contacts = useSelector(getContacts);
  const deliveries = useSelector(getDeliveries);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getMessages);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  const getPendingMessages = useCallback(
    (recipient: string) => {
      return Object.values(messages)
        .filter((message) => message.recipient === recipient)
        .filter(({messageId}) => {
          const delivery = deliveries[messageId];
          if (!delivery) return false;
          return delivery.attempts < MAX_MESSAGE_DELIVERY_ATTEMPTS && delivery.status === DeliveryStatus.pending;
        });
    },
    [deliveries, messages],
  );

  const onlineContactsAccountNumbers = useMemo(
    () => Object.keys(contacts).filter((accountNumber) => accountOnlineStatuses[accountNumber] === OnlineStatus.online),
    [accountOnlineStatuses, contacts],
  );

  const run = useCallback(() => {
    (async () => {
      for (const recipient of onlineContactsAccountNumbers) {
        const pendingMessages = getPendingMessages(recipient);

        const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
          balances,
          networkAccountOnlineStatuses,
          recipient,
        });

        if (!recipientsDefaultNetworkId) continue;

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
      }
    })();
  }, [balances, deliveries, dispatch, getPendingMessages, networkAccountOnlineStatuses, onlineContactsAccountNumbers]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), RESEND_PENDING_MESSAGES_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useResendPendingMessages;
