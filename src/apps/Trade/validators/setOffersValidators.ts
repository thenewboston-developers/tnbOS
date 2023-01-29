import {Offer, SetOffersParams} from 'apps/Trade/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

const termsValidator = yup
  .object({
    enabled: yup.boolean().required(),
    orderMax: yup.number().moreThan(0).required(),
    orderMin: yup.number().moreThan(0).required(),
    price: yup.number().moreThan(0).required(),
  })
  .noUnknown();

const offerValidator: yup.SchemaOf<Offer> = yup
  .object({
    clientAsset: yup
      .string()
      .required()
      .test(
        'no-spaces',
        'Client asset can not contain spaces',
        (clientAsset) => !!clientAsset && !clientAsset.includes(' '),
      ),
    host: accountNumberSchema.required(),
    hostAsset: yup
      .string()
      .required()
      .test('no-spaces', 'Host asset can not contain spaces', (hostAsset) => !!hostAsset && !hostAsset.includes(' ')),
    purchaseTerms: termsValidator,
    saleTerms: termsValidator,
  })
  .noUnknown();

interface ISetOffersParams extends Omit<SetOffersParams, 'modifiedDate'> {
  modifiedDate: Date;
}

export const setOffersValidator: yup.SchemaOf<ISetOffersParams> = yup
  .object({
    modifiedDate: yup.date().required(),
    offers: yup.array().of(offerValidator).required(),
  })
  .noUnknown();

export const validateHosts = (blockSender: string, offers: Offer[]) => {
  if (offers.length === 0) return;
  const hosts = offers.map(({host}) => host);
  const hostSet = new Set(hosts);
  if (hostSet.size !== 1) throw new Error('Hosts for all offers must match');
  const [host] = hostSet;
  if (host !== blockSender) throw new Error('Host for all offers must match block sender');
};

export const validateUniqueAssetPairs = (offers: Offer[]) => {
  const assetPairs = offers.map(({clientAsset, hostAsset}) => `${clientAsset}-${hostAsset}`);
  const assetPair = new Set(assetPairs);
  if (offers.length !== assetPair.size) throw new Error('Each offer must contain a unique client asset');
};
