import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {getActiveChat, getMessages} from 'apps/Chat/selectors/state';
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
  const messages = useSelector(getMessages);
  const messagesRef = useRef<HTMLDivElement>(null);

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

  const renderEmptyState = () => (
    <S.EmptyState>
      <EmptyState />
    </S.EmptyState>
  );

  const renderMessages = () => {
    const results = Object.values(messages)
      .filter(({recipient, sender}) => [recipient, sender].includes(activeChat!))
      .map(({content, createdDate, messageId, modifiedDate, sender}) => (
        <Message
          content={content}
          createdDate={createdDate}
          key={messageId}
          messageId={messageId}
          modifiedDate={modifiedDate}
          sender={sender}
        />
      ));

    return (
      <S.Messages onScroll={handleMessagesScroll} ref={messagesRef}>
        <OverviewMessageContainer />
        {results}
        <S.BottomMessage ref={bottomMessageRef} />
      </S.Messages>
    );
  };

  if (!activeChat) return renderEmptyState();

  return (
    <S.Container className={className}>
      {renderMessages()}
      <MessageForm />
    </S.Container>
  );
};

export default Right;
