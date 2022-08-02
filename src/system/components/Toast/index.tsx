import {ReactNode, useCallback} from 'react';

import {SFC, ToastType} from 'system/types';
import * as S from './Styles';

export interface ToastProps {
  children: ReactNode;
  type: ToastType;
}

const Toast: SFC<ToastProps> = ({children, className, type = ToastType.error}) => {
  const renderIcon = useCallback((): ReactNode => {
    switch (type) {
      case ToastType.success:
        return <S.CheckCircleIcon />;
      default:
        return <S.AlertCircleOutlineIcon />;
    }
  }, [type]);

  return (
    <S.Container className={className} type={type}>
      {renderIcon()}
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export default Toast;
