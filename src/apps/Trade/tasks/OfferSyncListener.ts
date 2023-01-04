import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getOffers} from 'apps/Trade/selectors/state';
import {resetOffersSync} from 'apps/Trade/store/offersSync';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';

const OfferSyncListener: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(getOffers);

  useEffect(() => {
    const now = currentSystemDate();
    dispatch(resetOffersSync(now));
  }, [dispatch, offers]);

  return null;
};

export default OfferSyncListener;
