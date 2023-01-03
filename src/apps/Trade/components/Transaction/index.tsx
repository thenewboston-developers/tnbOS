import {useMemo} from 'react';
import {mdiArrowDownCircleOutline, mdiArrowUpCircleOutline, mdiClockOutline} from '@mdi/js';

import Table from 'apps/Trade/components/Table';
import {Transaction as TTransaction, TransactionPerspective, TransactionStatus} from 'apps/Trade/types';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {camelToTitle} from 'system/utils/strings';
import * as S from './Styles';

export interface TransactionProps {
  perspective: TransactionPerspective;
  transaction: TTransaction;
}

const Transaction: SFC<TransactionProps> = ({className, perspective, transaction}) => {
  const [expanded, toggleExpanded] = useToggle(false);

  const transactionStatus = useMemo((): TransactionStatus => {
    if (transaction.isConfirmed) {
      return perspective === TransactionPerspective.receiver ? TransactionStatus.received : TransactionStatus.sent;
    }
    return perspective === TransactionPerspective.receiver ? TransactionStatus.receiving : TransactionStatus.sending;
  }, [perspective, transaction.isConfirmed]);

  const renderDetails = () => {
    const actions = {
      [TransactionStatus.received]: 'Received',
      [TransactionStatus.receiving]: 'Receiving',
      [TransactionStatus.sending]: 'Sending',
      [TransactionStatus.sent]: 'Sent',
    };
    const action = actions[transactionStatus];
    return (
      <S.Details>
        <S.DetailsTopText>{action} BACON</S.DetailsTopText>
        <S.BottomText>{shortDate(transaction.createdDate, true)}</S.BottomText>
      </S.Details>
    );
  };

  const renderExpandedDetails = () => {
    const rows = Object.entries(transaction).map(([key, value]) => {
      return {
        key: camelToTitle(key),
        value,
      };
    });
    return (
      <S.ExpandedDetails>
        <Table rows={rows} />
      </S.ExpandedDetails>
    );
  };

  const renderIcon = () => {
    const colors = {
      [TransactionStatus.received]: '#45c696',
      [TransactionStatus.receiving]: '#62aef2',
      [TransactionStatus.sending]: '#f3b95e',
      [TransactionStatus.sent]: '#818497',
    };

    const paths = {
      [TransactionStatus.received]: mdiArrowDownCircleOutline,
      [TransactionStatus.receiving]: mdiClockOutline,
      [TransactionStatus.sending]: mdiClockOutline,
      [TransactionStatus.sent]: mdiArrowUpCircleOutline,
    };

    const color = colors[transactionStatus];
    const path = paths[transactionStatus];

    return <S.Icon color={color} path={path} size="24px" />;
  };

  const renderValueContainer = () => {
    const isOutgoing = [TransactionStatus.sending, TransactionStatus.sent].includes(transactionStatus);
    const sign = isOutgoing ? '-' : '+';
    return (
      <S.ValueContainer>
        <S.Value transactionStatus={transactionStatus}>
          {sign}
          {transaction.amount}
        </S.Value>
      </S.ValueContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Top onClick={toggleExpanded}>
        {renderIcon()}
        {renderDetails()}
        {renderValueContainer()}
      </S.Top>
      {expanded ? renderExpandedDetails() : null}
    </S.Container>
  );
};

export default Transaction;
