import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getContacts, getMessages} from 'apps/Chat/selectors/state';
import {Message} from 'apps/Chat/types';
import {Dict} from 'system/types';

const useUnreadMessages = (): Dict<Message[]> => {
  const contacts = useSelector(getContacts);
  const messages = useSelector(getMessages);

  return useMemo(() => {
    return Object.keys(contacts).reduce((previousValue, accountNumber) => {
      const {lastSeenDate} = contacts[accountNumber];

      const unreadMessages = Object.values(messages).filter(({content, createdDate, sender, transfer}) => {
        const isContentDeleted = !content && !transfer;
        return !isContentDeleted && accountNumber === sender && lastSeenDate < createdDate;
      });

      return {...previousValue, [accountNumber]: unreadMessages};
    }, {});
  }, [contacts, messages]);
};

export default useUnreadMessages;
