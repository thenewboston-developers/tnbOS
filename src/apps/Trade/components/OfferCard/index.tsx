import {useDispatch, useSelector} from 'react-redux';
import {mdiDelete, mdiPencil} from '@mdi/js';

import AssetLogo from 'apps/Trade/components/AssetLogo';
import Table from 'apps/Trade/components/Table';
import Toggle from 'apps/Trade/components/Toggle';
import OfferModal from 'apps/Trade/modals/OfferModal';
import {unsetOffer, updatePurchaseTermsEnabled, updateSaleTermsEnabled} from 'apps/Trade/store/offers';
import {Offer} from 'apps/Trade/types';
import Icon from 'system/components/Icon';
import {useNetworkDisplayImage, useNetworkDisplayName, useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: SFC<OfferCardProps> = ({className, offer}) => {
  const {clientAsset, hostAsset, purchaseTerms, saleTerms} = offer;

  const [offerModalIsOpen, toggleOfferModal] = useToggle(false);
  const clientAssetDisplayName = useNetworkDisplayName(clientAsset, 16);
  const clientAssetLogo = useNetworkDisplayImage(clientAsset);
  const hostAssetLogo = useNetworkDisplayImage(hostAsset);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const handleDeleteClick = () => {
    dispatch(
      unsetOffer({
        clientAsset,
        host: self.accountNumber,
        hostAsset,
      }),
    );
    displayToast(`${clientAssetDisplayName} offer deleted`, ToastType.success);
  };

  const handlePurchaseTermsEnabledClick = () => {
    dispatch(
      updatePurchaseTermsEnabled({
        clientAsset,
        host: self.accountNumber,
        hostAsset,
      }),
    );
  };

  const handleSaleTermsEnabledClick = () => {
    dispatch(
      updateSaleTermsEnabled({
        clientAsset,
        host: self.accountNumber,
        hostAsset,
      }),
    );
  };

  const renderAmount = (amount: number, src: string) => (
    <S.AmountContainer>
      {amount}
      <S.Logo src={src} />
    </S.AmountContainer>
  );

  const renderBuyDetails = () => {
    const rows = [
      {
        key: `Purchase Price (per ${clientAssetDisplayName})`,
        value: renderAmount(purchaseTerms.price, hostAssetLogo),
      },
      {
        key: 'Order Minimum',
        value: renderAmount(purchaseTerms.orderMin, clientAssetLogo),
      },
      {
        key: 'Order Maximum',
        value: renderAmount(purchaseTerms.orderMax, clientAssetLogo),
      },
      {
        key: 'Buying Enabled',
        value: (
          <S.ToggleContainer>
            <Toggle checked={purchaseTerms.enabled} onClick={handlePurchaseTermsEnabledClick} />
          </S.ToggleContainer>
        ),
      },
    ];
    return (
      <S.Section>
        <S.SectionHeading>Purchase Terms</S.SectionHeading>
        <Table rows={rows} />
      </S.Section>
    );
  };

  const renderError = () => {
    if (purchaseTerms.price > saleTerms.price) {
      return (
        <S.ErrorContainer>
          <S.Error>The purchase price is greater than the sale price.</S.Error>
        </S.ErrorContainer>
      );
    }
    return null;
  };

  const renderSellDetails = () => {
    const rows = [
      {
        key: `Sale Price (per ${clientAssetDisplayName})`,
        value: renderAmount(saleTerms.price, hostAssetLogo),
      },
      {
        key: 'Order Minimum',
        value: renderAmount(saleTerms.orderMin, clientAssetLogo),
      },
      {
        key: 'Order Maximum',
        value: renderAmount(saleTerms.orderMax, clientAssetLogo),
      },
      {
        key: 'Selling Enabled',
        value: (
          <S.ToggleContainer>
            <Toggle checked={saleTerms.enabled} onClick={handleSaleTermsEnabledClick} />
          </S.ToggleContainer>
        ),
      },
    ];
    return (
      <S.Section>
        <S.SectionHeading>Sale Terms</S.SectionHeading>
        <Table rows={rows} />
      </S.Section>
    );
  };

  const renderTop = () => (
    <S.Top>
      <AssetLogo networkId={clientAsset} />
      <S.TopTools>
        <Icon icon={mdiPencil} onClick={toggleOfferModal} size={20} />
        <Icon icon={mdiDelete} onClick={handleDeleteClick} size={20} />
      </S.TopTools>
    </S.Top>
  );

  return (
    <>
      <S.Container className={className}>
        {renderTop()}
        {renderError()}
        <S.BottomSections>
          {renderBuyDetails()}
          {renderSellDetails()}
        </S.BottomSections>
      </S.Container>
      {offerModalIsOpen ? <OfferModal clientAsset={clientAsset} close={toggleOfferModal} offer={offer} /> : null}
    </>
  );
};

export default OfferCard;
