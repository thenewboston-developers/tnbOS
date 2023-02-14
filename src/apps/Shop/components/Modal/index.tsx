import {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {mdiClose} from '@mdi/js';

import Line from 'apps/Shop/components/Line';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ModalProps {
  children: ReactNode;
  close(): void;
  header: string;
}

const Modal: SFC<ModalProps> = ({children, className, close, header}) => {
  return createPortal(
    <>
      <S.Overlay onClick={close} />
      <S.Modal className={className}>
        <S.Header>
          <span>{header}</span>
          <S.Icon icon={mdiClose} onClick={close} size={16} unfocusable />
        </S.Header>
        <Line />
        <S.Content>{children}</S.Content>
      </S.Modal>
    </>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
