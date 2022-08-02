import QrCode from 'system/assets/qr-code.png';
import {useToggle} from 'system/hooks';
import AccountNumberModal from 'system/modals/AccountNumberModal';
import {SFC} from 'system/types';
import * as S from './Styles';

const QrIcon: SFC = ({className}) => {
  const [accountNumberModalIsOpen, toggleAccountNumberModal] = useToggle(false);

  return (
    <>
      <S.Img alt="qrCode" className={className} onClick={toggleAccountNumberModal} src={QrCode} />
      {accountNumberModalIsOpen ? <AccountNumberModal close={toggleAccountNumberModal} /> : null}
    </>
  );
};

export default QrIcon;
