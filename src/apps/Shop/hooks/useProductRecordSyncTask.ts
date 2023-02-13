import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setProductRecordBlock} from 'apps/Shop/blocks';
import {
  MAX_PRODUCT_RECORD_DELIVERY_ATTEMPTS,
  PRODUCT_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS,
} from 'apps/Shop/constants/protocol';
import useSelfProductRecord from 'apps/Shop/hooks/useSelfProductRecord';
import {getProductRecordRecipients} from 'apps/Shop/selectors/state';
import {setProductRecordRecipient} from 'apps/Shop/store/productRecordRecipients';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const useProductRecordSyncTask = () => {
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();
  const productRecord = useSelfProductRecord();
  const productRecordRecipients = useSelector(getProductRecordRecipients);

  const recipientAccountNumbers = useMemo(() => {
    return Object.keys(connectedAccounts).filter((accountNumber) => {
      const recipient = productRecordRecipients[accountNumber];
      return !recipient || (!recipient.delivered && recipient.deliveryAttempts < MAX_PRODUCT_RECORD_DELIVERY_ATTEMPTS);
    });
  }, [connectedAccounts, productRecordRecipients]);

  const run = useCallback(() => {
    (async () => {
      if (!productRecord) return;

      for (const recipientAccountNumber of recipientAccountNumbers) {
        const productRecordRecipient = productRecordRecipients[recipientAccountNumber];
        const deliveryAttempts = productRecordRecipient?.deliveryAttempts || 0;

        try {
          await setProductRecordBlock({
            networkId: connectedAccounts[recipientAccountNumber],
            params: productRecord,
            recipient: recipientAccountNumber,
          });
        } catch (error) {
          displayErrorToast('Error sending the product record');
        } finally {
          dispatch(
            setProductRecordRecipient({
              accountNumber: recipientAccountNumber,
              delivered: false,
              deliveryAttempts: deliveryAttempts + 1,
            }),
          );
        }
      }
    })();
  }, [connectedAccounts, dispatch, productRecord, productRecordRecipients, recipientAccountNumbers]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), PRODUCT_RECORD_SYNC_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useProductRecordSyncTask;
