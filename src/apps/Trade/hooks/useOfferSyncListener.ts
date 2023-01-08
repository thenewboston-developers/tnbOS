import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getOffers} from 'apps/Trade/selectors/state';
import {resetOffersSync} from 'apps/Trade/store/offersSync';
import {AppDispatch} from 'system/types';

const useOfferSyncListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector(getOffers);

  useEffect(() => {
    dispatch(resetOffersSync());
  }, [dispatch, offers]);
};

export default useOfferSyncListener;
