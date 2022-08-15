import {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import noop from 'lodash/noop';
import {ThemeProvider} from 'styled-components';
import {mdiClose} from '@mdi/js';

import Icon from 'system/components/Icon';
import {colors, fonts} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ModalProps {
  children: ReactNode;
  close(): void;
  disableOverlayClick?: boolean;
  footer?: ReactNode;
  header: string;
  theme?: ModalTheme;
}

export interface ModalTheme {
  backgroundColor: string;
  border: string;
  borderRadius: number;
  fontFamily: string;
  header: ModalThemeHeader;
  padding: string;
}

interface ModalThemeHeader {
  color: string;
  fontSize: number;
  fontWeight: number;
  marginBottom: number;
  padding: string;
}

const systemTheme: ModalTheme = {
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: 8,
  fontFamily: fonts.family.default,
  header: {
    color: colors.palette.gray['500'],
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 46,
    padding: '16px 24px 0',
  },
  padding: '0 24px 32px',
};

const Modal: SFC<ModalProps> = ({
  children,
  className,
  close,
  disableOverlayClick = false,
  footer,
  header,
  theme = systemTheme,
}) => {
  return createPortal(
    <>
      <S.Overlay onClick={disableOverlayClick ? noop : close} />
      <ThemeProvider theme={theme}>
        <S.Modal className={className}>
          <S.Header>
            <span>{header}</span>
            <Icon icon={mdiClose} onClick={close} size={16} />
          </S.Header>
          <S.Content>{children}</S.Content>
          {footer}
        </S.Modal>
      </ThemeProvider>
    </>,
    document.getElementById('modal-root')!,
  );
};

export default Modal;
