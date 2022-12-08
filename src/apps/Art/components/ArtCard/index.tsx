import {useDispatch} from 'react-redux';

import AccountLabel from 'apps/Art/components/AccountLabel';
import {setActivePage} from 'apps/Art/store/manager';
import {Page} from 'apps/Art/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const ArtCard: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(setActivePage(Page.details));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      <S.Bottom>
        <S.Name>Name of Artwork</S.Name>
        <AccountLabel />
        <AccountLabel />
      </S.Bottom>
    </S.Container>
  );
};

export default ArtCard;
