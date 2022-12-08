import AccountLabel from 'apps/Art/components/AccountLabel';
import Detail from 'apps/Art/components/Detail';
import {SFC} from 'system/types';
import * as S from './Styles';

const ArtOverview: SFC = ({className}) => {
  const renderAccounts = () => {
    return (
      <S.Accounts>
        <AccountLabel />
        <AccountLabel />
      </S.Accounts>
    );
  };

  const renderDetails = () => {
    return (
      <S.Details>
        <S.H2>Details</S.H2>
        <S.DetailItems>
          <Detail label="Created" value="11/19/22" />
          <Detail label="Last Updated" value="12/8/22" />
          <Detail label="ID" value="efe2662c-d3e3-4636-9290-12f805b672cc" />
        </S.DetailItems>
      </S.Details>
    );
  };

  return (
    <S.Container className={className}>
      <S.Left>
        <S.Img alt="art" src="https://i.pinimg.com/474x/a9/e5/60/a9e56077c22bfd00ca63a5e7cacded85.jpg" />
      </S.Left>
      <S.Right>
        <S.Name>Name of Artwork</S.Name>
        <S.Description>
          Bacon ipsum dolor amet alcatra drumstick boudin bresaola ham hock tri-tip venison salami.
        </S.Description>
        {renderAccounts()}
        {renderDetails()}
      </S.Right>
    </S.Container>
  );
};

export default ArtOverview;
