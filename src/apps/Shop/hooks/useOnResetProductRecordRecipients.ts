import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {setProductRecordBlock} from 'apps/Shop/blocks';
import useSelfProductRecord from 'apps/Shop/hooks/useSelfProductRecord';
import {getProductRecordRecipients} from 'apps/Shop/selectors/state';
import {setProductRecordRecipient} from 'apps/Shop/store/productRecordRecipients';
import {ProductRecordRecipients} from 'apps/Shop/types';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

/*
 * This hook is triggered when productRecordRecipients is reset due to an update in the product record.
 * When this happens, this hook will send connections the initial (updated) product record block.
 * A separate hook is responsible for the retry logic.
 * */

let prevProductRecordRecipients: ProductRecordRecipients = {};

const useOnResetProductRecordRecipients = () => {
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();
  const productRecord = useSelfProductRecord();
  const productRecordRecipients = useSelector(getProductRecordRecipients);

  if (!isEmpty(prevProductRecordRecipients) && isEmpty(productRecordRecipients)) {
    (async () => {
      if (!productRecord) return;

      for (const [accountNumber, defaultNetworkId] of Object.entries(connectedAccounts)) {
        try {
          await setProductRecordBlock({
            networkId: defaultNetworkId,
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
  }

  useEffect(() => {
    prevProductRecordRecipients = productRecordRecipients;
  }, [productRecordRecipients]);
};

export default useOnResetProductRecordRecipients;
