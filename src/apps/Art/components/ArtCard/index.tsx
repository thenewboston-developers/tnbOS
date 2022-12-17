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
        <AccountLabel
          accountNumber="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0"
          label="Creator"
        />
        <AccountLabel accountNumber="aaa7484c7c5f41901606631a771fcae7873cae2edac78c5597ba1472a1874dd6" label="Owner" />
      </S.Bottom>
    </S.Container>
  );
};

export default ArtCard;
