import {mdiCheck} from '@mdi/js';

import AccountLabel from 'apps/Art/components/AccountLabel';
import Detail from 'apps/Art/components/Detail';
import {SFC} from 'system/types';
import * as S from './Styles';

const HistoryTable: SFC = ({className}) => {
  const renderTableCells = () => {
    return (
      <>
        <AccountLabel
          accountNumber="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0"
          label="Creator"
        />
        <Detail label="Created" value="ID: efe2662c-d3e3-4636-9290-12f805b672cc" />
        <Detail label="Date" value="11/19/22" />
        <S.Icon path={mdiCheck} size="24px" />
        <AccountLabel accountNumber="aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6" label="Owner" />
        <Detail label="Updated" value="Name: Summer Day" />
        <Detail label="Date" value="11/23/22" />
        <S.Icon path={mdiCheck} size="24px" />
      </>
    );
  };

  return <S.Container className={className}>{renderTableCells()}</S.Container>;
};

export default HistoryTable;
