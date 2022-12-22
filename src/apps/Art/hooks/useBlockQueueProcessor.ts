import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useBroadcastBlock} from 'apps/Art/hooks';
import {getArtworks} from 'apps/Art/selectors/state';
import {deleteQueuedBlock, processQueuedBlock, setBlockQueueNeedsProcessing} from 'apps/Art/store/artworks';
import {Artwork, GenesisBlock, QueuedBlock, StandardBlock} from 'apps/Art/types';
import {validateQueuedBlockSignature} from 'apps/Art/validators/common';
import {
  genesisBlockValidator,
  validateArtworkIdMatchesBlockId,
  validateArtworkIdPayloadSignature,
  validateBlockChainIsEmpty,
  validateBlockIsNotInTransfer,
  validateCreatedDateMatchesModifiedDate,
  validateCreatorMatchesOwner,
} from 'apps/Art/validators/genesisBlockValidators';
import {
  standardBlockValidator,
  validateBlockChainIsNotEmpty,
  validateIncomingTransfer,
  validateNonMutableValues,
  validateOutgoingTransfer,
  validateOwner,
  validateTransferPayload,
} from 'apps/Art/validators/standardBlockValidators';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const useBlockQueueProcessor = () => {
  const artworks = useSelector(getArtworks);
  const broadcastBlock = useBroadcastBlock();
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
      return Object.values(blockQueue).find((queuedBlock) => queuedBlock.hasOwnProperty('artworkIdPayload'));
    }

    return blockQueue[headBlockSignature];
  };

  const isValidNextBlock = useCallback(async (artwork: Artwork, queuedBlock: QueuedBlock): Promise<boolean> => {
    const isGenesisBlock = queuedBlock.hasOwnProperty('artworkIdPayload');

    try {
      if (isGenesisBlock) {
        await validateGenesisBlock(artwork, queuedBlock as GenesisBlock);
      } else {
        await validateStandardBlock(artwork, queuedBlock as StandardBlock);
      }

      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null && error.hasOwnProperty('message')) {
        displayErrorToast((error as any).message);
      } else {
        displayErrorToast('Invalid queued block');
      }

      return false;
    }
  }, []);

  const validateGenesisBlock = async (artwork: Artwork, genesisBlock: GenesisBlock) => {
    await genesisBlockValidator.validate(genesisBlock);
    validateBlockChainIsEmpty(artwork);
    validateArtworkIdPayloadSignature(genesisBlock);
    validateArtworkIdMatchesBlockId(genesisBlock);
    validateCreatedDateMatchesModifiedDate(genesisBlock);
    validateCreatorMatchesOwner(genesisBlock);
    validateBlockIsNotInTransfer(genesisBlock);
    validateQueuedBlockSignature(artwork, genesisBlock);
  };

  const validateStandardBlock = async (artwork: Artwork, standardBlock: StandardBlock) => {
    await standardBlockValidator.validate(standardBlock);
    validateBlockChainIsNotEmpty(artwork);
    validateIncomingTransfer(artwork, standardBlock);
    validateNonMutableValues(artwork, standardBlock);
    validateOutgoingTransfer(artwork, standardBlock);
    validateOwner(artwork, standardBlock);
    validateTransferPayload(artwork, standardBlock);
    validateQueuedBlockSignature(artwork, standardBlock);
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
        await broadcastBlock(queuedBlock);
      } else {
        dispatch(deleteQueuedBlock(queuedBlock));
      }
    })();
  }, [artworks, broadcastBlock, dispatch, findArtworkNeedingProcessing, isValidNextBlock]);
};

export default useBlockQueueProcessor;
