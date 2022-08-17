import {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import Avatar from 'apps/Chat/components/Avatar';
import {getActiveChat} from 'apps/Chat/selectors/state';
import {getAccounts} from 'system/selectors/state';
import {OnlineStatus, SFC} from 'system/types';
import {safeDisplayImage, safeDisplayName} from 'system/utils/accounts';
import EmptyState from './EmptyState';
import Message from './Message';
import MessageForm from './MessageForm';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const accounts = useSelector(getAccounts);
  const activeChat = useSelector(getActiveChat);
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
        <Avatar displayImage={safeDisplayImage(activeChat, accounts)} onlineStatus={OnlineStatus.offline} />
        <S.OverviewMessageContainerRight>{safeDisplayName(activeChat, accounts, 10)}</S.OverviewMessageContainerRight>
      </S.OverviewMessageContainer>
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
