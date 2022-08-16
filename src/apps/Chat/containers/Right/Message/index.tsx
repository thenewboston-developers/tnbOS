import {useState} from 'react';
import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline, mdiDelete, mdiPencil} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Avatar from 'apps/Chat/components/Avatar';
import EditMessageModal from 'apps/Chat/modals/EditMessageModal';
import {colors} from 'apps/Chat/styles';
import {DeliveryStatus} from 'apps/Chat/types';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Message: SFC = ({className}) => {
  const [editMessageModalIsOpen, toggleEditMessageModal] = useToggle(false);
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
        color: colors.palette.red['300'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.failed]: {
        color: colors.palette.orange['300'],
        path: mdiAlertCircleOutline,
      },
      [DeliveryStatus.pending]: {
        color: colors.palette.gray['300'],
        path: mdiClockOutline,
      },
      [DeliveryStatus.received]: {
        color: colors.palette.green['300'],
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

  const renderHeader = () => {
    return (
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
    );
  };

  const renderMessageBody = () => {
    // if (isContentDeleted) return <S.ContentDeleted>This message has been deleted</S.ContentDeleted>;
    return <S.Content>Hey</S.Content>;
  };

  const renderTools = () => {
    return (
      <S.ToolsContainer>
        <S.Tools $display={toolsVisible}>
          <S.Tool icon={mdiPencil} onClick={toggleEditMessageModal} size={20} totalSize="unset" unfocusable />
          <S.Tool icon={mdiDelete} onClick={() => {}} size={20} totalSize="unset" unfocusable />
        </S.Tools>
      </S.ToolsContainer>
    );
  };

  return (
    <>
      <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" />
        <S.Right>
          {renderHeader()}
          {renderMessageBody()}
        </S.Right>
      </S.Container>
      {editMessageModalIsOpen ? <EditMessageModal close={toggleEditMessageModal} /> : null}
    </>
  );
};

export default Message;
