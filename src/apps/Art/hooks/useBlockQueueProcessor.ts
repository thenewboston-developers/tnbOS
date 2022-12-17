import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {getArtworks} from 'apps/Art/selectors/state';
import {deleteQueuedBlock, processQueuedBlock, setBlockQueueNeedsProcessing} from 'apps/Art/store/artworks';
import {Artwork, QueuedBlock} from 'apps/Art/types';
import {
  genesisBlockValidator,
  validateArtworkIdMatchesBlockId,
  validateArtworkIdPayloadSignature,
  validateBlockChainIsEmpty,
  validateBlockIsNotInTransfer,
  validateCreatedDateMatchesModifiedDate,
  validateGenesisBlockSignature,
} from 'apps/Art/validators/genesisBlockValidators';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const useBlockQueueProcessor = () => {
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();

  const findArtworkNeedingProcessing = useCallback((): string | null => {
    for (const [artworkId, artwork] of Object.entries(artworks)) {
      if (artwork.blockQueueNeedsProcessing) return artworkId;
    }
    return null;
  }, [artworks]);

  const findQueuedBlock = (artwork: Artwork): QueuedBlock | undefined => {
    const {blockQueue, headBlockSignature} = artwork;

    if (headBlockSignature === null) {
      return Object.values(blockQueue).find((queuedBlock) => !!queuedBlock.artworkIdPayload);
    }

    return blockQueue[headBlockSignature];
  };

  const isValidNextBlock = useCallback(async (artwork: Artwork, queuedBlock: QueuedBlock): Promise<boolean> => {
    const isGenesisBlock = !!queuedBlock.artworkIdPayload;

    try {
      if (isGenesisBlock) {
        await validateGenesisBlock(artwork, queuedBlock);
      } else {
        validateStandardBlock(artwork, queuedBlock);
      }

      return true;
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid queued block');
      return false;
    }
  }, []);

  const validateGenesisBlock = async (artwork: Artwork, queuedBlock: QueuedBlock) => {
    await genesisBlockValidator.validate(queuedBlock);
    validateBlockChainIsEmpty(artwork);
    validateArtworkIdPayloadSignature(queuedBlock);
    validateArtworkIdMatchesBlockId(queuedBlock);
    validateCreatedDateMatchesModifiedDate(queuedBlock);
    validateBlockIsNotInTransfer(queuedBlock);
    validateGenesisBlockSignature(queuedBlock);
  };

  const validateStandardBlock = (artwork: Artwork, queuedBlock: QueuedBlock) => {
    // TODO: Check no non-mutable values are being updated (artworkId, createdDate, etc...)
    // TODO: Check valid inTransfer transitions
    // TODO: Check owner as well
    return;
  };

  useEffect(() => {
    const artworkId = findArtworkNeedingProcessing();
    if (!artworkId) return;

    const artwork = artworks[artworkId];
    const queuedBlock = findQueuedBlock(artwork);

    if (!queuedBlock) {
      dispatch(
        setBlockQueueNeedsProcessing({
          artworkId,
          blockQueueNeedsProcessing: false,
        }),
      );
      return;
    }

    (async () => {
      const isValid = await isValidNextBlock(artwork, queuedBlock);

      if (isValid) {
        dispatch(processQueuedBlock(queuedBlock));
      } else {
        dispatch(deleteQueuedBlock(queuedBlock));
      }
    })();
  }, [artworks, dispatch, findArtworkNeedingProcessing, isValidNextBlock]);
};

export default useBlockQueueProcessor;
