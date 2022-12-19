import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountSelectCard from 'apps/Art/components/AccountSelectCard';
import {ButtonType} from 'apps/Art/components/Button';
import {setQueuedBlock} from 'apps/Art/store/artworks';
import {Artwork, UnsignedStandardBlock} from 'apps/Art/types';
import {getAccounts, getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {signData} from 'system/utils/signing';
import {verifySignature} from 'system/utils/tnb';
import * as S from './Styles';

interface TransferModalProps {
  artwork: Artwork;
  close(): void;
}

const TransferModal: SFC<TransferModalProps> = ({artwork, className, close}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const generateStandardBlock = () => {
    const unsignedStandardBlock: UnsignedStandardBlock = {
      payload: {
        artworkId: artwork.attributes.artworkId!,
        blockId: artwork.headBlockSignature!,
        inTransfer: true,
        modifiedDate: currentSystemDate(),
        owner: selectedAccount!,
      },
    };

    const signedStandardBlockPayload = signData(unsignedStandardBlock.payload, self.signingKey);
    const standardBlockSignature = signedStandardBlockPayload.signature;

    return {
      ...unsignedStandardBlock,
      signature: standardBlockSignature,
    };
  };

  const handleAccountSelectCardClick = (accountNumber: string) => {
    const value = accountNumber === selectedAccount ? null : accountNumber;
    setSelectedAccount(value);
  };

  const handleButtonClick = () => {
    const block = generateStandardBlock();

    verifySignature({
      accountNumber: self.accountNumber,
      signature: block.signature,
      unsignedData: block.payload,
    });

    dispatch(setQueuedBlock(block));
  };

  const renderAccountSelectCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    const accountSelectCards = orderedAccounts.map(({accountNumber}) => (
      <AccountSelectCard
        accountNumber={accountNumber}
        key={accountNumber}
        isSelected={accountNumber === selectedAccount}
        onClick={() => handleAccountSelectCardClick(accountNumber)}
      />
    ));

    return <S.AccountSelectCards>{accountSelectCards}</S.AccountSelectCards>;
  };

  return (
    <S.Modal className={className} close={close} header="Transfer Artwork">
      {renderAccountSelectCards()}
      <S.Button disabled={!selectedAccount} onClick={handleButtonClick} text="Submit" type={ButtonType.button} />
    </S.Modal>
  );
};

export default TransferModal;
