import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';
import {mdiArrowLeft} from '@mdi/js';

import ArtOverview from 'apps/Art/components/ArtOverview';
import Button, {ButtonType} from 'apps/Art/components/Button';
import {Input} from 'apps/Art/components/FormElements';
import {useCanvasArtworkAttributes} from 'apps/Art/hooks';
import {setQueuedBlock} from 'apps/Art/store/artworks';
import {setActivePage, setDetailsPageArtworkId} from 'apps/Art/store/manager';
import {getArtworks} from 'apps/Art/selectors/state';
import {
  ArtworkIdPayload,
  GenesisBlock,
  Page,
  QueuedBlockPayload,
  UnsignedGenesisBlock,
  UnsignedStandardBlock,
} from 'apps/Art/types';
import {sortAttributesAlphabetically} from 'apps/Art/utils/attributes';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {signData} from 'system/utils/signing';
import {verifySignature} from 'system/utils/tnb';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

const Canvas: SFC = ({className}) => {
  const [submittedArtworkId, setSubmittedArtworkId] = useState<string>('');
  const [submittedBlockId, setSubmittedBlockId] = useState<string>('');
  const artworks = useSelector(getArtworks);
  const canvasArtworkAttributes = useCanvasArtworkAttributes();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    description: canvasArtworkAttributes?.description || '',
    imageUrl: canvasArtworkAttributes?.imageUrl || '',
    name: canvasArtworkAttributes?.name || '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!submittedArtworkId || !submittedBlockId) return;

    const artwork = artworks[submittedArtworkId];
    const blockChain = artwork.blockChain;
    const block = blockChain[submittedBlockId];

    if (!block) return;

    if (canvasArtworkAttributes) {
      displayToast('Artwork updated', ToastType.success);
    } else {
      displayToast('Artwork created', ToastType.success);
    }

    dispatch(setDetailsPageArtworkId(submittedArtworkId));
    dispatch(setActivePage(Page.details));
  }, [artworks, canvasArtworkAttributes, dispatch, submittedArtworkId, submittedBlockId]);

  const generateGenesisBlock = (values: FormValues): GenesisBlock => {
    const now = currentSystemDate();

    const artworkIdPayload: ArtworkIdPayload = {
      currentTime: new Date().getTime(),
    };

    const signedArtworkIdPayload = signData(artworkIdPayload, self.signingKey);
    const artworkId = signedArtworkIdPayload.signature;

    const unsignedGenesisBlock: UnsignedGenesisBlock = {
      artworkIdPayload,
      payload: {
        artworkId,
        blockId: artworkId,
        createdDate: now,
        creator: self.accountNumber,
        description: values.description,
        imageUrl: values.imageUrl,
        inTransfer: false,
        modifiedDate: now,
        name: values.name,
        owner: self.accountNumber,
      },
    };

    const signedGenesisBlockPayload = signData(unsignedGenesisBlock.payload, self.signingKey);
    const genesisBlockSignature = signedGenesisBlockPayload.signature;

    return {
      ...unsignedGenesisBlock,
      signature: genesisBlockSignature,
    };
  };

  const generateStandardBlock = (values: FormValues) => {
    const {artworkId} = canvasArtworkAttributes!;
    const artwork = artworks[artworkId!];

    const updatedValues = Object.entries(values).reduce((previousValue, [key, value]) => {
      return (canvasArtworkAttributes as any)[key] !== value ? {...previousValue, [key]: value} : previousValue;
    }, {});

    const queuedBlockPayload: QueuedBlockPayload = {
      artworkId: artworkId!,
      blockId: artwork.headBlockSignature!,
      modifiedDate: currentSystemDate(),
      owner: self.accountNumber,
      ...updatedValues,
    };

    const sortedQueuedBlockPayload: any = sortAttributesAlphabetically(queuedBlockPayload);

    const unsignedStandardBlock: UnsignedStandardBlock = {
      payload: sortedQueuedBlockPayload,
    };

    const signedStandardBlockPayload = signData(unsignedStandardBlock.payload, self.signingKey);
    const standardBlockSignature = signedStandardBlockPayload.signature;

    return {
      ...unsignedStandardBlock,
      signature: standardBlockSignature,
    };
  };

  const handleBackClick = () => {
    const {artworkId} = canvasArtworkAttributes!;
    dispatch(setDetailsPageArtworkId(artworkId!));
    dispatch(setActivePage(Page.details));
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const block = canvasArtworkAttributes ? generateStandardBlock(values) : generateGenesisBlock(values);

    verifySignature({
      accountNumber: block.payload.owner,
      signature: block.signature,
      unsignedData: block.payload,
    });

    dispatch(setQueuedBlock(block));

    const {
      payload: {artworkId, blockId},
    } = block;

    setSubmittedArtworkId(artworkId);
    setSubmittedBlockId(blockId);
  };

  const renderBack = () => {
    if (!canvasArtworkAttributes) return;

    return (
      <S.Back onClick={handleBackClick}>
        <S.BackIcon path={mdiArrowLeft} size="20px" />
        <span>Back to Artwork</span>
      </S.Back>
    );
  };

  const renderPreviewContainer = (values: FormValues) => {
    return (
      <S.PreviewContainer>
        <ArtOverview
          creator={canvasArtworkAttributes?.creator || self.accountNumber}
          description={values.description}
          imageUrl={values.imageUrl}
          name={values.name}
          owner={self.accountNumber}
        />
      </S.PreviewContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      imageUrl: yup.string().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnMount={false}
      validationSchema={validationSchema}
    >
      {({dirty, errors, isSubmitting, isValid, touched, values}) => {
        return (
          <S.Container className={className}>
            <S.Left>
              <Form>
                <Input errors={errors} label="Image URL" name="imageUrl" placeholder="Enter URL" touched={touched} />
                <Input errors={errors} label="Name" name="name" placeholder="Enter name" touched={touched} />
                <Input
                  errors={errors}
                  label="Description"
                  name="description"
                  placeholder="Enter description"
                  touched={touched}
                />
                <Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text="Submit"
                  type={ButtonType.submit}
                />
              </Form>
              {renderBack()}
            </S.Left>
            <S.Right>{renderPreviewContainer(values)}</S.Right>
          </S.Container>
        );
      }}
    </Formik>
  );
};

export default Canvas;
