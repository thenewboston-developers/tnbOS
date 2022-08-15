import {useEffect, useMemo, useRef, useState} from 'react';
import {Formik, FormikHelpers} from 'formik';

import Avatar from 'apps/Chat/components/Avatar';
import {ButtonType} from 'apps/Chat/components/Button';
import {SFC} from 'system/types';
import yup from 'system/utils/forms/yup';
import EmptyState from './EmptyState';
import Message from './Message';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const bottomMessageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    amount: '',
    content: '',
  };

  type FormValues = typeof initialValues;

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

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    console.log(values);
    console.log(resetForm);
  };

  const renderEmptyState = () => (
    <S.EmptyState>
      <EmptyState />
    </S.EmptyState>
  );

  const renderForm = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <S.Form>
            <S.ContentInput errors={errors} name="content" placeholder="New Message" touched={touched} />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text=""
              type={ButtonType.submit}
            />
          </S.Form>
        )}
      </Formik>
    );
  };

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
        <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" />
        <S.OverviewMessageContainerRight>Bob</S.OverviewMessageContainerRight>
      </S.OverviewMessageContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string(),
    });
  }, []);

  if (false) return renderEmptyState();

  return (
    <S.Container className={className}>
      {renderMessages()}
      {renderForm()}
    </S.Container>
  );
};

export default Right;
