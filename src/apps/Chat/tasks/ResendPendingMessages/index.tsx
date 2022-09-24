import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getContacts} from 'apps/Chat/selectors/state';
import ResendRecipientsPendingMessages from 'apps/Chat/tasks/ResendPendingMessages/ResendRecipientsPendingMessages';
import {getAccountOnlineStatuses} from 'system/selectors/state';
import {OnlineStatus, SFC} from 'system/types';

const ResendPendingMessages: SFC = () => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const contacts = useSelector(getContacts);

  const onlineContactsAccountNumbers = useMemo(() => {
    return Object.keys(contacts).filter(
      (accountNumber) => accountOnlineStatuses[accountNumber] === OnlineStatus.online,
    );
  }, [accountOnlineStatuses, contacts]);

  const renderResendRecipientsPendingMessages = () => {
    return onlineContactsAccountNumbers.map((accountNumber) => (
      <ResendRecipientsPendingMessages recipient={accountNumber} />
    ));
  };

  return <>{renderResendRecipientsPendingMessages()}</>;
};

export default ResendPendingMessages;
