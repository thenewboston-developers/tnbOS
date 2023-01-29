import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {ChatRegistration} from 'apps/Chat/registration';
import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
import {getManager} from 'system/selectors/state';
import {SFC} from 'system/types';
import EmptyState from './EmptyState';
import Message from './Message';
import MessageForm from './MessageForm';
import OverviewMessageContainer from './OverviewMessageContainer';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const activeChat = useSelector(getActiveChat);
  const bottomMessageRef = useRef<HTMLDivElement>(null);
  const manager = useSelector(getManager);
  const messages = useSelector(getMessages);
  const messagesRef = useRef<HTMLDivElement>(null);

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
