import {useToggle} from 'system/hooks';
import AccountNumberModal from 'system/modals/AccountNumberModal';
import {SFC} from 'system/types';
import * as S from './Styles';

const Balance: SFC = ({className}) => {
  const [accountNumberModalIsOpen, toggleAccountNumberModal] = useToggle(false);

  return (
    <>
      <S.Container className={className}>
        <div onClick={toggleAccountNumberModal}>Click me</div>
      </S.Container>
      {accountNumberModalIsOpen ? <AccountNumberModal close={toggleAccountNumberModal} /> : null}
    </>
  );
};

export default Balance;
