import {mdiCircle} from '@mdi/js';
import Icon from '@mdi/react';

import {colors} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AvatarProps {
  displayImage: string;
  displayOnlineStatus?: boolean;
  isOnline?: boolean;
}

const Avatar: SFC<AvatarProps> = ({className, displayImage, displayOnlineStatus = true, isOnline}) => {
  const renderOnlineStatus = () => {
    const color = isOnline ? colors.palette.green['400'] : colors.palette.gray['300'];
    return (
      <>
        <S.OnlineIndicatorOuter>
          <Icon color="white" path={mdiCircle} size="14px" />
        </S.OnlineIndicatorOuter>
        <S.OnlineIndicatorInner>
          <Icon color={color} path={mdiCircle} size="10px" />
        </S.OnlineIndicatorInner>
      </>
    );
  };

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={displayImage} />
      {displayOnlineStatus && renderOnlineStatus()}
    </S.Container>
  );
};

export default Avatar;
