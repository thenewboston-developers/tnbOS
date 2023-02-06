import {CSSProperties, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {mdiCellphoneLink, mdiPaperclip, mdiSignal} from '@mdi/js';

import AttachmentSelectorOption from 'apps/Chat/components/AttachmentSelectorOption';
import Menu from 'apps/Chat/components/Menu';
import AttachAccountsModal from 'apps/Chat/modals/AttachAccountsModal';
import AttachNetworksModal from 'apps/Chat/modals/AttachNetworksModal';
import {useEventListener, useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const dropupRoot = document.getElementById('dropup-root')!;

const AttachmentSelector: SFC = ({className}) => {
  const [attachAccountsModalIsOpen, toggleAttachAccountsModal] = useToggle(false);
  const [attachNetworksModalIsOpen, toggleAttachNetworksModal] = useToggle(false);
  const [isMenuOpen, toggleIsMenuOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAttachAccountsClick = () => {
    toggleAttachAccountsModal();
    toggleIsMenuOpen(false);
  };

  const handleAttachNetworksClick = () => {
    toggleAttachNetworksModal();
    toggleIsMenuOpen(false);
  };

  const handleClick = (e: any): void => {
    if (containerRef.current?.contains(e.target)) return;
    if (!containerRef.current?.contains(e.target) && !dropupRoot.contains(e.target)) toggleIsMenuOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleToggleButtonClick = useCallback((): void => {
    if (!containerRef.current) return;

    const {
      bottom: iconBottom,
      height: iconHeight,
      left: iconLeft,
      width: iconWidth,
    } = containerRef.current.getBoundingClientRect();

    const position: CSSProperties = {
      bottom: window.innerHeight - iconBottom + iconHeight / 2,
      right: window.innerWidth - iconLeft - iconWidth / 2,
    };

    setMenuPosition(position);
    toggleIsMenuOpen();
  }, [toggleIsMenuOpen]);

  const renderAttachAccountsModal = () => {
    if (!attachAccountsModalIsOpen) return null;
    return <AttachAccountsModal close={toggleAttachAccountsModal} />;
  };

  const renderAttachNetworksModal = () => {
    if (!attachNetworksModalIsOpen) return null;
    return <AttachNetworksModal close={toggleAttachNetworksModal} />;
  };

  const renderMenu = () => (
    <Menu style={menuPosition}>
      <AttachmentSelectorOption icon={mdiCellphoneLink} onClick={handleAttachAccountsClick} text="Accounts" />
      <AttachmentSelectorOption icon={mdiSignal} onClick={handleAttachNetworksClick} text="Networks" />
    </Menu>
  );

  return (
    <>
      <S.Container className={className} onClick={handleToggleButtonClick} ref={containerRef}>
        <S.Icon path={mdiPaperclip} size="26px" />
      </S.Container>
      {isMenuOpen && createPortal(renderMenu(), dropupRoot)}
      {renderAttachAccountsModal()}
      {renderAttachNetworksModal()}
    </>
  );
};

export default AttachmentSelector;
