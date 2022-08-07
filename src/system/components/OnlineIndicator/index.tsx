import {mdiCircle} from '@mdi/js';
import Icon from '@mdi/react';

import {colors} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface OnlineIndicatorProps {
  isOnline?: boolean;
}

const OnlineIndicator: SFC<OnlineIndicatorProps> = ({isOnline}) => {
  const color = isOnline ? colors.palette.green['400'] : colors.palette.gray['300'];

  return (
    <>
      <S.Outer>
        <Icon color="white" path={mdiCircle} size="14px" />
      </S.Outer>
      <S.Inner>
        <Icon color={color} path={mdiCircle} size="10px" />
      </S.Inner>
    </>
  );
};

export default OnlineIndicator;
