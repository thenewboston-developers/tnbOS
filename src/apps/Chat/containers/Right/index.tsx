import {useEffect, useRef, useState} from 'react';

import Avatar from 'apps/Chat/components/Avatar';
import {OnlineStatus, SFC} from 'system/types';
import EmptyState from './EmptyState';
import Message from './Message';
import MessageForm from './MessageForm';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const bottomMessageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  // TODO: Update to be [messages, scrollToBottom]
  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current || !scrollToBottom) return;
    bottomMessageRef.current.scrollIntoView({behavior: 'smooth'});
  }, [scrollToBottom]);

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
    const results = [
      <Message />,
      <Message />,
      <Message />,
      <Message />,
      <Message />,
      <Message />,
      <Message />,
      <Message />,
      <Message />,
    ];
    return (
      <S.Messages onScroll={handleMessagesScroll} ref={messagesRef}>
        {renderRecipientOverviewMessage()}
        {results}
        <S.BottomMessage ref={bottomMessageRef} />
      </S.Messages>
    );
  };

  const renderRecipientOverviewMessage = () => {
    return (
      <S.OverviewMessageContainer>
        <Avatar
          displayImage="https://avatars.githubusercontent.com/u/8547538?v=4"
          onlineStatus={OnlineStatus.offline}
        />
        <S.OverviewMessageContainerRight>Bob</S.OverviewMessageContainerRight>
      </S.OverviewMessageContainer>
    );
  };

  if (false) return renderEmptyState();

  return (
    <S.Container className={className}>
      {renderMessages()}
      <MessageForm />
    </S.Container>
  );
};

export default Right;
