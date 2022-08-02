import TNBLogo from 'system/assets/tnb-logo.png';
import Modal from 'system/components/Modal';
import QrCopy from 'system/components/QrCopy';
import {SFC} from 'system/types';
import Arrow from './assets/arrow.png';
import * as S from './Styles';

interface WelcomeModalProps {
  close(): void;
}

const WelcomeModal: SFC<WelcomeModalProps> = ({className, close}) => {
  const renderFooter = () => (
    <S.Footer>
      <S.FooterLeft>You can always view your account number by clicking on this icon in the dock.</S.FooterLeft>
      <S.FooterRight>
        <S.Arrow alt="arrow" src={Arrow} />
        <S.Logo alt="logo" src={TNBLogo} />
      </S.FooterRight>
    </S.Footer>
  );

  return (
    <Modal className={className} close={close} footer={renderFooter()} header="Getting Started">
      <S.GettingStartedText>
        To <b>get started</b>, share your account number with an existing user so that they can then send credits to
        your account.
      </S.GettingStartedText>
      <QrCopy accountNumber="c960478b3204204434223e6a30e27f327386074a6bbacdaf34d2f3902ef3207a" />
    </Modal>
  );
};

export default WelcomeModal;
