import {CSSProperties, useCallback, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';
import {mdiPlusCircle} from '@mdi/js';

import NetworkSelectorOption from 'apps/Chat/containers/Right/NetworkSelector/NetworkSelectorOption';
import {useActiveNetwork} from 'apps/Chat/hooks';
import {getActiveNetworkId} from 'apps/Chat/selectors/state';
import {setActiveNetworkId} from 'apps/Chat/store/manager';
import {GenericVoidFunction} from 'shared/types';
import {useEventListener, useToggle} from 'system/hooks';
import {getBalances, getNetworks} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const dropupRoot = document.getElementById('dropup-root')!;

const NetworkSelector: SFC = ({className}) => {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [menuPosition, setMenuPosition] = useState<CSSProperties | undefined>(undefined);
  const activeNetwork = useActiveNetwork();
  const activeNetworkId = useSelector(getActiveNetworkId);
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const imgRef = useRef<HTMLDivElement>(null);
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
      right: window.innerWidth - iconLeft - iconWidth / 2,
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
    return orderBy(Object.values(networks), ['displayName'])
      .filter(({networkId}) => networkId !== activeNetworkId)
      .map(({displayImage, displayName, networkId}, index) => (
        <NetworkSelectorOption
          balance={balances[networkId]}
          key={index}
          displayImage={displayImage}
          displayName={displayName}
          onClick={handleOptionClick(() => {
            dispatch(setActiveNetworkId(networkId));
          })}
          ref={(el) => {
            if (el) optionsRef.current[index] = el;
          }}
          role="button"
        />
      ));
  }, [activeNetworkId, balances, dispatch, handleOptionClick, networks]);

  const removeOption = useMemo(() => {
    if (!activeNetwork) return [];
    const index = networkOptions.length;
    return [
      <NetworkSelectorOption
        balance={null}
        key={index}
        displayName="Default"
        onClick={handleOptionClick(() => {
          dispatch(setActiveNetworkId(null));
        })}
        ref={(el) => {
          if (el) optionsRef.current[index] = el;
        }}
        role="button"
      />,
    ];
  }, [activeNetwork, dispatch, handleOptionClick, networkOptions.length]);

  const renderImage = () => {
    return activeNetwork ? (
      <S.Img alt="logo" src={activeNetwork.displayImage} />
    ) : (
      <S.Icon path={mdiPlusCircle} size="26px" />
    );
  };

  const renderMenu = () => {
    const options = [...networkOptions, ...removeOption];
    return <S.Menu style={menuPosition}>{options}</S.Menu>;
  };

  return (
    <>
      <S.ImgContainer className={className} onClick={handleImageClick} ref={imgRef}>
        {renderImage()}
      </S.ImgContainer>
      {isOpen && createPortal(renderMenu(), dropupRoot)}
    </>
  );
};

export default NetworkSelector;
