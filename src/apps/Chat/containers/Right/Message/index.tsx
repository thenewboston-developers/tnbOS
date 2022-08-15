import {useState} from 'react';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Avatar from 'apps/Chat/components/Avatar';
import {colors} from 'apps/Chat/styles';
import {DeliveryStatus} from 'apps/Chat/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const Message: SFC = ({className}) => {
  // const [editMessageModalIsOpen, toggleEditMessageModal] = useToggle(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    // if (sender !== selfAccountNumber || isContentDeleted) return;
    setToolsVisible(true);
  };

  const renderDeliveryStatus = () => {
    // if (selfAccountNumber !== sender || !system) return null;

    const icons = {
      [DeliveryStatus.error]: {
        color: colors.error,
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.failed]: {
        color: colors.failed,
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.pending]: {
        color: colors.pending,
        path: mdiClockOutline,
      },
      [DeliveryStatus.received]: {
        color: colors.received,
        path: mdiCheck,
      },
    };

    const {color, path} = icons[DeliveryStatus.received];
    return <MdiIcon color={color} path={path} size="14px" />;
  };

  const renderEdited = () => {
    // if (createdDate === modifiedDate) return null;
    return <S.Edited>(edited)</S.Edited>;
  };

  const renderMessageBody = () => {
    // if (isContentDeleted) return <S.ContentDeleted>This message has been deleted</S.ContentDeleted>;
    return <S.Content>Hey</S.Content>;
  };

  const renderTools = () => {
    return (
      <S.ToolsContainer>
        <S.Tools $display={toolsVisible}>
          <S.Tool icon={mdiPencil} onClick={() => {}} size={18} totalSize="unset" />
          <S.Tool icon={mdiDelete} onClick={() => {}} size={18} totalSize="unset" />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <S.Container className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" />
      <S.Right>
        <S.Header>
          <S.HeaderLeft>
            <S.DisplayName>Bob</S.DisplayName>
            <S.Date>12/28/20</S.Date>
            {renderEdited()}
          </S.HeaderLeft>
          <S.HeaderRight>
            {renderTools()}
            {renderDeliveryStatus()}
          </S.HeaderRight>
        </S.Header>
        {renderMessageBody()}
      </S.Right>
    </S.Container>
  );
};

export default Message;
