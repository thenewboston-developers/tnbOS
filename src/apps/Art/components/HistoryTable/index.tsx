import {mdiCheck} from '@mdi/js';

import AccountLabel from 'apps/Art/components/AccountLabel';
import Detail from 'apps/Art/components/Detail';
import {SFC} from 'system/types';
import * as S from './Styles';

const HistoryTable: SFC = ({className}) => {
  const renderTableCells = () => {
    return (
      <>
        <AccountLabel />
        <Detail label="Created" value="ID: efe2662c-d3e3-4636-9290-12f805b672cc" />
        <Detail label="Date" value="11/19/22" />
        <S.Icon path={mdiCheck} size="24px" />
        <AccountLabel />
        <Detail label="Updated" value="Name: Summer Day" />
        <Detail label="Date" value="11/23/22" />
        <S.Icon path={mdiCheck} size="24px" />
      </>
    );
  };

  return <S.Container className={className}>{renderTableCells()}</S.Container>;
};

export default HistoryTable;
