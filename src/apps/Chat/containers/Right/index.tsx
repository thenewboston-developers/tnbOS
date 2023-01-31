import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {ChatRegistration} from 'apps/Chat/registration';
import {getActiveChat, getContacts, getMessages} from 'apps/Chat/selectors/state';
import {Message as TMessage} from 'apps/Chat/types';
import {getManager} from 'system/selectors/state';
import {setContact} from 'apps/Chat/store/contacts';
import {AppDispatch, Dict, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import EmptyState from './EmptyState';
import Message from './Message';
import MessageForm from './MessageForm';
import OverviewMessageContainer from './OverviewMessageContainer';
import * as S from './Styles';

export interface RightProps {
  unreadMessages: Dict<TMessage[]>;
}

const Right: SFC<RightProps> = ({className, unreadMessages}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const activeChat = useSelector(getActiveChat);
  const bottomMessageRef = useRef<HTMLDivElement>(null);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const messages = useSelector(getMessages);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!activeChat) return;
      const contact = contacts[activeChat];
      const notificationCount = unreadMessages[activeChat].length;
      if (!!notificationCount) dispatch(setContact({...contact, lastSeenDate: currentSystemDate()}));
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeChat, contacts, dispatch, unreadMessages]);

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current || manager.activeApp !== ChatRegistration.appId) return;

    // As the app becomes visible the refs are initialized before rendering is complete
    // This delays scrolling until painting is complete
    const timeout = setTimeout(() => {
      bottomMessageRef?.current?.scrollIntoView(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [bottomMessageRef, manager.activeApp, messagesRef]);

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current || manager.activeApp !== ChatRegistration.appId) return;
    bottomMessageRef?.current?.scrollIntoView(false);
  }, [activeChat, bottomMessageRef, manager.activeApp, messagesRef]);

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current || !scrollToBottom) return;
    bottomMessageRef.current.scrollIntoView({behavior: 'smooth'});
  }, [messages, scrollToBottom]);

  const firstUnreadMessageId = useMemo((): string | null => {
    if (!activeChat) return null;
    const messageList = orderBy(unreadMessages[activeChat], ['createdDate']);
    const message = messageList[0];
    return message ? message.messageId : null;
  }, [activeChat, unreadMessages]);

  const handleMessagesScroll = () => {
    if (!bottomMessageRef.current || !messagesRef.current) return;
    const {clientHeight, scrollHeight, scrollTop} = messagesRef.current;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;
    setScrollToBottom(isScrolledToBottom);
  };

  const renderEmptyStateContainer = () => (
    <S.EmptyStateContainer>
      <EmptyState />
    </S.EmptyStateContainer>
  );

  const renderMessages = () => {
    const results = Object.values(messages)
      .filter(({recipient, sender}) => [recipient, sender].includes(activeChat!))
      .map(({content, createdDate, messageId, modifiedDate, sender, transfer}) => (
        <Message
          content={content}
          createdDate={createdDate}
          firstUnreadMessageId={firstUnreadMessageId}
          key={messageId}
          messageId={messageId}
          modifiedDate={modifiedDate}
          sender={sender}
          transfer={transfer}
        />
      ));

    return (
      <S.Messages onScroll={handleMessagesScroll} ref={messagesRef}>
        {results}
        <S.BottomMessage ref={bottomMessageRef} />
      </S.Messages>
    );
  };

  if (!activeChat) return renderEmptyStateContainer();

  return (
    <S.Container className={className}>
      <OverviewMessageContainer />
      {renderMessages()}
      <MessageForm />
    </S.Container>
  );
};

export default Right;
