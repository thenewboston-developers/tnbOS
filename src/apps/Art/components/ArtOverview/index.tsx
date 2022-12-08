import {ReactNode} from 'react';

import AccountLabel from 'apps/Art/components/AccountLabel';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ArtOverviewProps {
  artOverviewDetails?: ReactNode;
}

const ArtOverview: SFC<ArtOverviewProps> = ({artOverviewDetails, className}) => {
  const renderAccounts = () => {
    return (
      <S.Accounts>
        <AccountLabel />
        <AccountLabel />
      </S.Accounts>
    );
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      </S.Left>
    );
  };

  const renderRight = () => {
    return (
      <S.Right>
        <S.Name>Name of Artwork</S.Name>
        <S.Description>
          Bacon ipsum dolor amet alcatra drumstick boudin bresaola ham hock tri-tip venison salami.
        </S.Description>
        {renderAccounts()}
        {artOverviewDetails}
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      {renderLeft()}
      {renderRight()}
    </S.Container>
  );
};

export default ArtOverview;
