import React, {useMemo} from 'react';

import Loader from 'system/components/Loader';
import {SFC} from 'system/types';
import * as S from './Styles';
import {ButtonColor, ButtonType} from './types';

export interface ButtonProps {
  color?: ButtonColor;
  dirty?: boolean;
  disabled?: boolean;
  icon?: string;
  isSubmitting?: boolean;
  isValid?: boolean;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  text: string;
  type?: ButtonType;
}

const Button: SFC<ButtonProps> = ({
  color = ButtonColor.primary,
  className,
  dirty = true,
  disabled = false,
  icon,
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

  const renderButtonContent = () => (
    <>
      {icon ? <S.Icon color="white" path={icon} size="18px" /> : null}
      {text}
    </>
  );

  return (
    <S.Button
      $color={color}
      className={className}
      disabled={buttonIsDisabled}
      hasIcon={!!icon}
      onClick={onClick}
      type={type}
    >
      {type === ButtonType.submit && isSubmitting ? <Loader size={12} /> : renderButtonContent()}
    </S.Button>
  );
};

export {ButtonColor, ButtonType};
export default Button;
