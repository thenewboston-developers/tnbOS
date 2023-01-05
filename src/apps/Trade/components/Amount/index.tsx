import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AmountProps {
  amount: number;
  amountLabel?: string;
  bottomText?: string;
  leftAlign?: boolean;
  networkId: string;
}

const Amount: SFC<AmountProps> = ({amount, amountLabel, bottomText, className, leftAlign = false, networkId}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  const amountLabelText = amountLabel ? `${amountLabel}: ` : '';

  return (
    <S.Container leftAlign={leftAlign}>
      <S.AmountContainer className={className}>
        <S.Price>{`${amountLabelText}${amount}`}</S.Price>
        <S.Logo src={networkDisplayImage} />
      </S.AmountContainer>
      {bottomText ? <S.BottomText>{bottomText}</S.BottomText> : null}
    </S.Container>
  );
};

export default Amount;
