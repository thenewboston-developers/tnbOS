import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiArrowDownCircleOutline, mdiArrowUpCircleOutline} from '@mdi/js';

import Table from 'apps/Trade/components/Table';
import {Transaction as TTransaction, TransactionPerspective, TransactionStatus} from 'apps/Trade/types';
import {useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {camelToTitle} from 'system/utils/strings';
import * as S from './Styles';

export interface TransactionProps {
  transaction: TTransaction;
}

const Transaction: SFC<TransactionProps> = ({className, transaction}) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const self = useSelector(getSelf);

  const perspective = useMemo((): TransactionPerspective => {
    return self.accountNumber === transaction.sender ? TransactionPerspective.sender : TransactionPerspective.receiver;
  }, [self.accountNumber, transaction.sender]);

  const transactionStatus = useMemo((): TransactionStatus => {
    return perspective === TransactionPerspective.receiver ? TransactionStatus.received : TransactionStatus.sent;
  }, [perspective]);

  const renderDetails = () => {
    const actions = {
      [TransactionStatus.received]: 'Received',
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
      [TransactionStatus.sent]: '#818497',
    };

    const paths = {
      [TransactionStatus.received]: mdiArrowDownCircleOutline,
      [TransactionStatus.sent]: mdiArrowUpCircleOutline,
    };

    const color = colors[transactionStatus];
    const path = paths[transactionStatus];

    return <S.Icon color={color} path={path} size="24px" />;
  };

  const renderValueContainer = () => {
    const sign = transactionStatus === TransactionStatus.sent ? '-' : '+';
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
