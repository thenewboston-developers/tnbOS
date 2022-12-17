import {ReactNode} from 'react';

import AccountLabel from 'apps/Art/components/AccountLabel';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ArtOverviewProps {
  artOverviewDetails?: ReactNode;
  creator: string;
  description: string;
  imageUrl: string;
  name: string;
  owner: string;
}

const ArtOverview: SFC<ArtOverviewProps> = ({
  artOverviewDetails,
  className,
  creator,
  description,
  imageUrl,
  name,
  owner,
}) => {
  const renderAccounts = () => {
    return (
      <S.Accounts>
        <AccountLabel accountNumber={creator} label="Creator" />
        <AccountLabel accountNumber={owner} label="Owner" />
      </S.Accounts>
    );
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.Img alt="Artwork Image" src={imageUrl} />
      </S.Left>
    );
  };

  const renderRight = () => {
    return (
      <S.Right>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
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
