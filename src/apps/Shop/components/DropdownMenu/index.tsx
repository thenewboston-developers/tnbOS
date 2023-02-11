import {CSSProperties, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch} from 'react-redux';

import {setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {useEventListener, useToggle} from 'system/hooks';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const dropDown = document.getElementById('dropdown-root')!;

const DropdownMenu: SFC = ({className}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const dispatch = useDispatch<AppDispatch>();
  const iconRef = useRef<HTMLImageElement>(null);

  const handleBuyClick = () => {
    dispatch(setActivePage(Page.buyHome));
    toggleIsOpen(false);
  };

  const handleClick = (e: any): void => {
    if (iconRef.current?.contains(e.target)) return;
    if (!iconRef.current?.contains(e.target) && !dropDown.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleSellClick = () => {
    dispatch(setActivePage(Page.sellProducts));
    toggleIsOpen(false);
  };

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

  const renderMenu = () => {
    return (
      <S.Menu style={menuPosition}>
        <S.Option onClick={handleBuyClick}>Buy</S.Option>
        <S.Option onClick={handleSellClick}>Sell</S.Option>
      </S.Menu>
    );
  };

  return (
    <>
      <S.Img
        alt="avatar"
        className={className}
        onClick={handleIconClick}
        ref={iconRef}
        src="https://avatars.githubusercontent.com/u/8547538?v=4"
      />
      {isOpen && createPortal(renderMenu(), dropDown)}
    </>
  );
};

export default DropdownMenu;
