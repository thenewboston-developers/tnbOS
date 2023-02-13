import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import difference from 'lodash/difference';

import {setProductRecordBlock} from 'apps/Shop/blocks';
import useSelfProductRecord from 'apps/Shop/hooks/useSelfProductRecord';
import {setProductRecordRecipient} from 'apps/Shop/store/productRecordRecipients';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch, Dict} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

let prevConnectedAccounts: Dict<string> = {};

const useOnConnection = () => {
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();
  const productRecord = useSelfProductRecord();

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  (async () => {
    if (!productRecord) return;

    for (const accountNumber of difference(connectedAccountNumbers, prevConnectedAccountNumbers)) {
      try {
        await setProductRecordBlock({
          networkId: connectedAccounts[accountNumber],
          params: productRecord,
          recipient: accountNumber,
        });
      } catch (error) {
        displayErrorToast('Error sending the product record');
      } finally {
        dispatch(
          setProductRecordRecipient({
            accountNumber,
            delivered: false,
            deliveryAttempts: 1,
          }),
        );
      }
    }
  })();

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnConnection;
