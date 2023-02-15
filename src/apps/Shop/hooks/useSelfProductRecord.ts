import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getProductRecords} from 'apps/Shop/selectors/state';
import {ProductRecord} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';

const useSelfProductRecord = (): ProductRecord | undefined => {
  const productRecords = useSelector(getProductRecords);
  const self = useSelector(getSelf);

  return useMemo(() => {
    return productRecords[self.accountNumber];
  }, [productRecords, self.accountNumber]);
};

export default useSelfProductRecord;
