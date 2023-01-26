import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import difference from 'lodash/difference';

import {getArtworks} from 'apps/Art/selectors/state';
import {unsetArtworks} from 'apps/Art/store/artworks';
import {useConnectedAccounts} from 'system/hooks';
import {AppDispatch, Dict} from 'system/types';

let prevConnectedAccounts: Dict<string> = {};

const useOnDisconnection = () => {
  const artworks = useSelector(getArtworks);
  const connectedAccounts = useConnectedAccounts();
  const dispatch = useDispatch<AppDispatch>();

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  for (const accountNumber of difference(prevConnectedAccountNumbers, connectedAccountNumbers)) {
    const artworkIds = Object.values(artworks)
      .filter(({attributes}) => !!attributes?.artworkId && attributes?.owner === accountNumber)
      .map(({attributes}) => attributes.artworkId!);

    dispatch(unsetArtworks(artworkIds));
  }

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnDisconnection;
