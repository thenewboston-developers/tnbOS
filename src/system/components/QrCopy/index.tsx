import CopyToClipboard from 'react-copy-to-clipboard';

import Qr from 'system/components/Qr';
import {SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface QrCopyProps {
  accountNumber: string;
}

const QrCopy: SFC<QrCopyProps> = ({accountNumber, className}) => {
  const handleCopy = (): void => {
    displayToast('Account Number copied to the clipboard', ToastType.success);
  };

  return (
    <S.Container className={className}>
      <Qr text={accountNumber} width={120} />
      <S.CopyContainer>
        <S.AccountNumber>{accountNumber}</S.AccountNumber>
        <CopyToClipboard text={accountNumber} onCopy={handleCopy}>
          <S.CopyText>Copy</S.CopyText>
        </CopyToClipboard>
      </S.CopyContainer>
    </S.Container>
  );
};

export default QrCopy;
