import React from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';
import {ButtonColor} from './types';

export interface OutlineButtonProps {
  color?: ButtonColor;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  text: string;
}

const OutlineButton: SFC<OutlineButtonProps> = ({className, color = ButtonColor.primary, onClick, text}) => {
  return (
    <S.Button className={className} $color={color} onClick={onClick}>
      {text}
    </S.Button>
  );
};

export {ButtonColor};
export default OutlineButton;
