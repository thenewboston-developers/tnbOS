import {CSSProperties, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {GenericVoidFunction} from 'shared/types';
import Icon from 'system/components/Icon';
import ToolbarItem from 'system/components/ToolbarItem';
import {useEventListener, useToggle} from 'system/hooks';
import {TOOLBAR_HEIGHT} from 'system/styles';
import {Menu, Option} from 'system/styles/components/DropMenuStyle';
import {SFC} from 'system/types';

export enum DropupMenuDirection {
  left,
  right,
}

export interface DropupMenuOption {
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export interface DropupMenuProps {
  direction: DropupMenuDirection;
  icon: string;
  options: DropupMenuOption[];
}

const dropupRoot = document.getElementById('dropup-root')!;

const DropupMenu: SFC<DropupMenuProps> = ({className, direction, icon, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const iconRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropupRoot.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleIconClick = useCallback((): void => {
    if (!iconRef.current) return;

    const {left: iconLeft, width: iconWidth} = iconRef.current.getBoundingClientRect();
    const position: CSSProperties = {bottom: TOOLBAR_HEIGHT / 2 + 8};

    if (direction === DropupMenuDirection.left) {
      position.right = window.innerWidth - iconLeft - iconWidth / 2;
    } else if (direction === DropupMenuDirection.right) {
      position.left = iconLeft + iconWidth / 2;
    }

    setMenuPosition(position);
    toggleIsOpen();
  }, [direction, toggleIsOpen]);

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    toggleIsOpen(false);
  };

  const renderMenu = () => (
    <Menu style={menuPosition}>
      {options.map(({label, onClick: optionOnClick}, index) => (
        <Option
          key={index}
          onClick={handleOptionClick(optionOnClick)}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
        >
          {label}
        </Option>
      ))}
    </Menu>
  );

  return (
    <>
      <ToolbarItem className={className} onClick={handleIconClick} refObject={iconRef}>
        <Icon icon={icon} size={24} />
      </ToolbarItem>
      {isOpen && createPortal(renderMenu(), dropupRoot)}
    </>
  );
};

export default DropupMenu;
