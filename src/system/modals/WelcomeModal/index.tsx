import {useSelector} from 'react-redux';

import QrCode from 'system/assets/qr-code.png';
import Modal from 'system/components/Modal';
import QrCopy from 'system/components/QrCopy';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import Arrow from './assets/arrow.png';
import * as S from './Styles';

interface WelcomeModalProps {
  close(): void;
}

const WelcomeModal: SFC<WelcomeModalProps> = ({className, close}) => {
  const self = useSelector(getSelf);

  const renderFooter = () => (
    <S.Footer>
      <S.FooterLeft>You can always view your account number by clicking this icon on your toolbar.</S.FooterLeft>
      <S.FooterRight>
        <S.Arrow alt="arrow" src={Arrow} />
        <S.QrCode alt="logo" src={QrCode} />
      </S.FooterRight>
    </S.Footer>
  );

  return (
    <Modal className={className} close={close} footer={renderFooter()} header="Getting Started">
      <S.GettingStartedText>
        To <b>get started</b>, share your account number with an existing user so that they can then send you credits.
      </S.GettingStartedText>
      <QrCopy accountNumber={self.accountNumber} />
    </Modal>
  );
};

export default WelcomeModal;
