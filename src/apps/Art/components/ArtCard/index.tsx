import {useDispatch} from 'react-redux';

import AccountLabel from 'apps/Art/components/AccountLabel';
import {setActivePage, setDetailsPageArtworkId} from 'apps/Art/store/manager';
import {ArtworkAttributes, Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface ArtCardProps {
  artworkAttributes: Partial<ArtworkAttributes>;
}

const ArtCard: SFC<ArtCardProps> = ({artworkAttributes, className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (!artworkAttributes.artworkId) return;
    dispatch(setDetailsPageArtworkId(artworkAttributes.artworkId));
    dispatch(setActivePage(Page.details));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Img alt="art" src={artworkAttributes.imageUrl} />
      <S.Bottom>
        <S.Name>{artworkAttributes.name}</S.Name>
        <AccountLabel accountNumber={artworkAttributes.creator} label="Creator" />
        <AccountLabel accountNumber={artworkAttributes.owner} label="Owner" />
      </S.Bottom>
    </S.Container>
  );
};

export default ArtCard;
