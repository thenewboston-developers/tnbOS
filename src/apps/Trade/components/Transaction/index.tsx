import {ReactNode, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiArrowDownCircleOutline, mdiArrowUpCircleOutline} from '@mdi/js';

import Table from 'apps/Trade/components/Table';
import {TransactionPerspective, TransactionStatus} from 'apps/Trade/types';
import {useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {Dict, NetworkBlock, SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import {camelToTitle} from 'system/utils/strings';
import * as S from './Styles';

export interface TransactionProps {
  networkBlock: NetworkBlock;
}

const Transaction: SFC<TransactionProps> = ({className, networkBlock}) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const self = useSelector(getSelf);

  const perspective = useMemo((): TransactionPerspective => {
    return networkBlock.sender === self.accountNumber ? TransactionPerspective.sender : TransactionPerspective.receiver;
  }, [networkBlock.sender, self.accountNumber]);

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
        <S.BottomText>{shortDate(networkBlock.date, true)}</S.BottomText>
      </S.Details>
    );
  };

  const renderExpandedDetails = () => {
    const keyOverrides: Dict<string> = {
      id: 'Block ID',
      transaction_fee: 'Transaction Fee',
    };

    const valueOverrides: {[key: string]: (value?: any) => ReactNode} = {
      payload: (value) => JSON.stringify(value, null, 4),
    };

    /* eslint-disable sort-keys */
    const orderedNetworkBlock: NetworkBlock = {
      id: networkBlock.id,
      amount: networkBlock.amount,
      transaction_fee: networkBlock.transaction_fee,
      sender: networkBlock.sender,
      recipient: networkBlock.recipient,
      signature: networkBlock.signature,
      payload: networkBlock.payload,
      date: networkBlock.date,
    };
    /* eslint-enable sort-keys */

    const rows = Object.entries(orderedNetworkBlock)
      .filter(([key]) => key !== 'date')
      .map(([key, value]) => ({
        key: keyOverrides[key] || camelToTitle(key),
        value: valueOverrides[key] ? valueOverrides[key](value) : value,
      }));

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
          {networkBlock.amount}
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
