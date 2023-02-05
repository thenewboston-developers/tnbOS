import {CSSProperties, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {mdiCellphoneLink, mdiPaperclip, mdiSignal} from '@mdi/js';

import AttachmentSelectorOption from 'apps/Chat/components/AttachmentSelectorOption';
import Menu from 'apps/Chat/components/Menu';
import {GenericVoidFunction} from 'shared/types';
import {useEventListener, useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const dropupRoot = document.getElementById('dropup-root')!;

const AttachmentSelector: SFC = ({className}) => {
  const [isMenuOpen, toggleIsMenuOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: any): void => {
    if (containerRef.current?.contains(e.target)) return;
    if (!containerRef.current?.contains(e.target) && !dropupRoot.contains(e.target)) toggleIsMenuOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleOptionClick = useCallback(
    (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
      await optionOnClick();
      toggleIsMenuOpen(false);
    },
    [toggleIsMenuOpen],
  );

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

  const renderMenu = () => (
    <Menu style={menuPosition}>
      <AttachmentSelectorOption
        icon={mdiCellphoneLink}
        onClick={handleOptionClick(() => {
          console.log('Attach Accounts');
        })}
        text="Accounts"
      />
      <AttachmentSelectorOption
        icon={mdiSignal}
        onClick={handleOptionClick(() => {
          console.log('Attach Networks');
        })}
        text="Networks"
      />
    </Menu>
  );

  return (
    <>
      <S.Container className={className} onClick={handleToggleButtonClick} ref={containerRef}>
        <S.Icon path={mdiPaperclip} size="26px" />
      </S.Container>
      {isMenuOpen && createPortal(renderMenu(), dropupRoot)}
    </>
  );
};

export default AttachmentSelector;
