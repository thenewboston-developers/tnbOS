import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AddContactModalProps {
  close(): void;
}

const AddContactModal: SFC<AddContactModalProps> = ({className, close}) => {
  const renderAccountCard = () => {
    return (
      <S.AccountCard>
        <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" />
        <S.AccountCardText>
          <S.DisplayName>Bob</S.DisplayName>
          <S.AccountNumber>979338...3fe1c0</S.AccountNumber>
        </S.AccountCardText>
        <Button color={ButtonColor.success} onClick={close} text="Add" />
      </S.AccountCard>
    );
  };

  const renderAccountCards = () => {
    return (
      <>
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="New Chat">
      <S.AccountCardContainer>{renderAccountCards()}</S.AccountCardContainer>
    </S.Modal>
  );
};

export default AddContactModal;
