import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface TableRow {
  key: string;
  value: ReactNode;
}

export interface TableProps {
  rows: TableRow[];
}

const Table: SFC<TableProps> = ({className, rows}) => {
  const renderRows = () => {
    return rows.map(({key, value}) => (
      <tr key={key}>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    ));
  };

  return (
    <S.Table className={className}>
      <tbody>{renderRows()}</tbody>
    </S.Table>
  );
};

export default Table;
