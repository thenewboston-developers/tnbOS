import React, {useMemo} from 'react';

import Loader from 'system/components/Loader';
import {SFC} from 'system/types';
import * as S from './Styles';
import {ButtonType} from './types';

export interface ButtonProps {
  dirty?: boolean;
  disabled?: boolean;
  isSubmitting?: boolean;
  isValid?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  text: string;
  type?: ButtonType;
}

const Button: SFC<ButtonProps> = ({
  className,
  dirty = true,
  disabled = false,
  isSubmitting = false,
  isValid = false,
  onClick,
  text,
  type = ButtonType.button,
}) => {
  const buttonIsDisabled = useMemo(() => {
    switch (type) {
      case ButtonType.submit:
        return !dirty || disabled || isSubmitting || !isValid;
      default:
        return disabled || isSubmitting;
    }
  }, [dirty, disabled, isSubmitting, isValid, type]);

  return (
    <S.Button className={className} disabled={buttonIsDisabled} onClick={onClick} type={type}>
      {type === ButtonType.submit && isSubmitting ? <Loader size={12} /> : text}
    </S.Button>
  );
};

export {ButtonType};
export default Button;
