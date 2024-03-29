import {setOffersReceiptBlock} from 'apps/Trade/blocks';
import {setHostsRemoteOffers} from 'apps/Trade/store/remoteOffers';
import {setOffersValidator, validateHosts, validateUniqueAssetPairs} from 'apps/Trade/validators/setOffersValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setOffersListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setOffersValidator.validate(params);
      const {modifiedDate, offers} = params;

      validateHosts(blockSender, offers);
      validateUniqueAssetPairs(offers);

      dispatch(
        setHostsRemoteOffers({
          host: blockSender,
          offers,
        }),
      );

      await setOffersReceiptBlock({
        networkId,
        params: {modifiedDate},
        recipient: blockSender,
      });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setOffersListener;
