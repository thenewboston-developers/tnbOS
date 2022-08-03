import {mdiCircle} from '@mdi/js';
import Icon from '@mdi/react';

import {colors} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface NetworkLogoProps {
  displayOnlineStatus?: boolean;
  isOnline?: boolean;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, displayOnlineStatus = true, isOnline}) => {
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
      <S.Img
        alt="logo"
        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.18169-9/10959337_935836523117476_1197309008858496777_n.png?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=sadiwF-RwMkAX9-uKgy&_nc_ht=scontent-lga3-1.xx&oh=00_AT-dxttfj7aSedymObJXdqHmvXA4Tv8lvPvI3b_G9r1V8A&oe=63113066"
      />
      {displayOnlineStatus && renderOnlineStatus()}
    </S.Container>
  );
};

export default NetworkLogo;
