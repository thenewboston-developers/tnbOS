import {useNetworkDisplayImage} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface TickerTableProps {
  networkId: string;
  rows: TickerTableRow[];
}

export interface TickerTableRow {
  key: string;
  value: number;
}

const TickerTable: SFC<TickerTableProps> = ({className, networkId, rows}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  const renderAmount = (value: number) => {
    return (
      <S.AmountContainer>
        {value.toLocaleString()}
        <S.Logo alt="logo" src={networkDisplayImage} />
      </S.AmountContainer>
    );
  };

  const renderRows = () => {
    return rows.map(({key, value}) => (
      <S.Row key={key}>
        <S.Key>{key}</S.Key>
        {renderAmount(value)}
      </S.Row>
    ));
  };

  return <S.Container className={className}>{renderRows()}</S.Container>;
};

export default TickerTable;
