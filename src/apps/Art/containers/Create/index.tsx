import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import ArtOverview from 'apps/Art/components/ArtOverview';
import Button, {ButtonType} from 'apps/Art/components/Button';
import {Input} from 'apps/Art/components/FormElements';
import {useEditPageArtworkAttributes} from 'apps/Art/hooks';
import {setQueuedBlock} from 'apps/Art/store/artworks';
import {setActivePage, setDetailsPageArtworkId} from 'apps/Art/store/manager';
import {getArtworks} from 'apps/Art/selectors/state';
import {ArtworkIdPayload, GenesisBlock, Page, UnsignedGenesisBlock, UnsignedStandardBlock} from 'apps/Art/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {signData} from 'system/utils/signing';
import {verifySignature} from 'system/utils/tnb';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const [submittedArtworkId, setSubmittedArtworkId] = useState<string>('');
  const artworks = useSelector(getArtworks);
  const dispatch = useDispatch<AppDispatch>();
  const editPageArtworkAttributes = useEditPageArtworkAttributes();
  const self = useSelector(getSelf);

  const initialValues = {
    description: editPageArtworkAttributes?.description || '',
    imageUrl: editPageArtworkAttributes?.imageUrl || '',
    name: editPageArtworkAttributes?.name || '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!submittedArtworkId) return;

    const artwork = artworks[submittedArtworkId];

    if (artwork && artwork.headBlockSignature) {
      dispatch(setDetailsPageArtworkId(submittedArtworkId));
      dispatch(setActivePage(Page.details));
    }
  }, [artworks, dispatch, submittedArtworkId]);

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
    const {artworkId} = editPageArtworkAttributes!;
    const artwork = artworks[artworkId!];

    const updatedValues = Object.entries(values).reduce((previousValue, [key, value]) => {
      return (editPageArtworkAttributes as any)[key] !== value ? {...previousValue, [key]: value} : previousValue;
    }, {});

    const unsignedStandardBlock: UnsignedStandardBlock = {
      payload: {
        artworkId: artworkId!,
        blockId: artwork.headBlockSignature!,
        modifiedDate: currentSystemDate(),
        owner: self.accountNumber,
        ...updatedValues,
      },
    };

    const signedStandardBlockPayload = signData(unsignedStandardBlock.payload, self.signingKey);
    const standardBlockSignature = signedStandardBlockPayload.signature;

    return {
      ...unsignedStandardBlock,
      signature: standardBlockSignature,
    };
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const block = editPageArtworkAttributes ? generateStandardBlock(values) : generateGenesisBlock(values);

    verifySignature({
      accountNumber: block.payload.owner,
      signature: block.signature,
      unsignedData: block.payload,
    });

    dispatch(setQueuedBlock(block));

    const {
      payload: {artworkId},
    } = block;

    setSubmittedArtworkId(artworkId);
  };

  const renderPreviewContainer = (values: FormValues) => {
    return (
      <S.PreviewContainer>
        <ArtOverview
          creator={editPageArtworkAttributes?.creator || self.accountNumber}
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
            </S.Left>
            <S.Right>{renderPreviewContainer(values)}</S.Right>
          </S.Container>
        );
      }}
    </Formik>
  );
};

export default Create;
