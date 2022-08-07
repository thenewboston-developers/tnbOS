import {CSSProperties, ReactNode, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {GenericVoidFunction} from 'shared/types';
import Icon from 'system/components/Icon';
import {useEventListener, useToggle} from 'system/hooks';
import {Menu, Option} from 'system/styles/components/DropMenuStyle';
import {SFC} from 'system/types';

export interface DropdownMenuOption {
  label: ReactNode;
  onClick: GenericVoidFunction;
}

export interface DropdownMenuProps {
  icon: string;
  options: DropdownMenuOption[];
}

const dropDown = document.getElementById('dropdown-root')!;

const DropdownMenu: SFC<DropdownMenuProps> = ({className, icon, options}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const iconRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleIconClick = useCallback((): void => {
    if (!iconRef.current) return;

    const {
      height: iconHeight,
      left: iconLeft,
      top: iconTop,
      width: iconWidth,
    } = iconRef.current.getBoundingClientRect();

    const position: CSSProperties = {
      right: window.innerWidth - iconLeft - iconWidth / 2,
      top: iconTop + iconHeight / 2,
    };

    setMenuPosition(position);
    toggleIsOpen();
  }, [toggleIsOpen]);

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
      <Icon className={className} icon={icon} onClick={handleIconClick} ref={iconRef} size={24} />
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default DropdownMenu;
