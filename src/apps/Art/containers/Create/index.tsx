import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import ArtOverview from 'apps/Art/components/ArtOverview';
import Button, {ButtonType} from 'apps/Art/components/Button';
import {Input} from 'apps/Art/components/FormElements';
import {setQueuedBlock} from 'apps/Art/store/artworks';
import {ArtworkIdPayload, GenesisBlock, UnsignedGenesisBlock} from 'apps/Art/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import yup from 'system/utils/forms/yup';
import {signData} from 'system/utils/signing';
import {verifySignature} from 'system/utils/tnb';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const initialValues = {
    description: '',
    imageUrl: '',
    name: '',
  };

  type FormValues = typeof initialValues;

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

  const handleSubmit = async (values: FormValues): Promise<void> => {
    const genesisBlock = generateGenesisBlock(values);

    verifySignature({
      accountNumber: genesisBlock.payload.owner,
      signature: genesisBlock.signature,
      unsignedData: genesisBlock.payload,
    });

    dispatch(setQueuedBlock(genesisBlock));
  };

  const renderPreviewContainer = (values: FormValues) => {
    return (
      <S.PreviewContainer>
        <ArtOverview
          creator="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0"
          description={values.description}
          imageUrl={values.imageUrl}
          name={values.name}
          owner="aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6"
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
