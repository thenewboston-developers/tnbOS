import {useSelector} from 'react-redux';

import AccountLabel from 'apps/Art/components/AccountLabel';
import ArtOverviewDetails from 'apps/Art/components/ArtOverviewDetails';
import OwnerMenu from 'apps/Art/components/OwnerMenu';
import {getActivePage} from 'apps/Art/selectors/state';
import {Page} from 'apps/Art/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ArtOverviewProps {
  creator?: string;
  description?: string;
  imageUrl?: string;
  name?: string;
  owner?: string;
}

const ArtOverview: SFC<ArtOverviewProps> = ({className, creator, description, imageUrl, name, owner}) => {
  const activePage = useSelector(getActivePage);

  const renderAccounts = () => {
    return (
      <S.Accounts>
        <AccountLabel accountNumber={creator} label="Creator" />
        <AccountLabel accountNumber={owner} label="Owner" />
      </S.Accounts>
    );
  };

  const renderArtOverviewDetails = () => {
    if (activePage !== Page.details) return null;
    return <ArtOverviewDetails />;
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.Img alt="Artwork Image" src={imageUrl} />
        {renderOwnerMenu()}
      </S.Left>
    );
  };

  const renderOwnerMenu = () => {
    if (activePage !== Page.details) return null;
    return <OwnerMenu />;
  };

  const renderRight = () => {
    return (
      <S.Right>
        <S.Name>{name || '-'}</S.Name>
        <S.Description>{description || '-'}</S.Description>
        {renderAccounts()}
        {renderArtOverviewDetails()}
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
