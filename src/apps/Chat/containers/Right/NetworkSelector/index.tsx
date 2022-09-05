import {CSSProperties, useCallback, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';

import NetworkOption from 'apps/Chat/containers/Right/NetworkSelector/NetworkOption';
import {useActiveNetwork} from 'apps/Chat/hooks';
import {getActiveNetworkId} from 'apps/Chat/selectors/state';
import {setActiveNetworkId} from 'apps/Chat/store/manager';
import {GenericVoidFunction} from 'shared/types';
import {useEventListener, useToggle} from 'system/hooks';
import {getNetworks} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const dropupRoot = document.getElementById('dropup-root')!;

const NetworkSelector: SFC = ({className}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const activeNetwork = useActiveNetwork();
  const activeNetworkId = useSelector(getActiveNetworkId);
  const dispatch = useDispatch<AppDispatch>();
  const imgRef = useRef<HTMLImageElement>(null);
  const networks = useSelector(getNetworks);
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

  const handleOptionClick = useCallback(
    (optionOnClick: GenericVoidFunction) => async (): Promise<void> => {
      await optionOnClick();
      toggleIsOpen(false);
    },
    [toggleIsOpen],
  );

  const networkOptions = useMemo(() => {
    return Object.values(networks)
      .filter((network) => network.networkId !== activeNetworkId)
      .map((network, index) => (
        <NetworkOption
          key={index}
          network={network}
          onClick={handleOptionClick(() => {
            dispatch(setActiveNetworkId(network.networkId));
          })}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
        />
      ));
  }, [activeNetworkId, dispatch, handleOptionClick, networks]);

  const renderImage = () => {
    const src = activeNetwork?.displayImage || 'https://cdn-icons-png.flaticon.com/512/4315/4315609.png';
    return <S.Img alt="logo" onClick={handleImageClick} ref={imgRef} src={src} />;
  };

  const renderMenu = () => {
    return <S.Menu style={menuPosition}>{networkOptions}</S.Menu>;
  };

  return (
    <>
      <S.ImgContainer className={className}>{renderImage()}</S.ImgContainer>
      {isOpen && createPortal(renderMenu(), dropupRoot)}
    </>
  );
};

export default NetworkSelector;
