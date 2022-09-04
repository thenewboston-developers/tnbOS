import {CSSProperties, useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {GenericVoidFunction} from 'shared/types';
import {useEventListener, useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const dropupRoot = document.getElementById('dropup-root')!;

const NetworkSelector: SFC = ({className}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  const handleClick = (e: any): void => {
    if (imgRef.current?.contains(e.target)) return;
    if (!imgRef.current?.contains(e.target) && !dropupRoot.contains(e.target)) toggleIsOpen(false);
  };

  useEventListener('mousedown', handleClick, document);

  const handleImageClick = useCallback((): void => {
    if (!imgRef.current) return;

    const {
      bottom: iconBottom,
      height: iconHeight,
      left: iconLeft,
      width: iconWidth,
    } = imgRef.current.getBoundingClientRect();

    const position: CSSProperties = {
      bottom: window.innerHeight - iconBottom + iconHeight / 2,
      left: iconLeft + iconWidth / 2,
    };

    setMenuPosition(position);
    toggleIsOpen();
  }, [toggleIsOpen]);

  const handleOptionClick = (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
    await optionOnClick();
    toggleIsOpen(false);
  };

  const menuOptions = [
    {label: 'tnb', onClick: () => {}},
    {label: 'local', onClick: () => {}},
  ];

  const renderMenu = () => (
    <S.Menu style={menuPosition}>
      {menuOptions.map(({label, onClick: optionOnClick}, index) => (
        <S.Option
          key={index}
          onClick={handleOptionClick(optionOnClick)}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
        >
          {label}
        </S.Option>
      ))}
    </S.Menu>
  );

  return (
    <>
      <S.ImgContainer className={className}>
        <S.Img
          alt="logo"
          onClick={handleImageClick}
          ref={imgRef}
          src="https://cdn-icons-png.flaticon.com/512/4315/4315609.png"
        />
      </S.ImgContainer>
      {isOpen && createPortal(renderMenu(), dropupRoot)}
    </>
  );
};

export default NetworkSelector;
