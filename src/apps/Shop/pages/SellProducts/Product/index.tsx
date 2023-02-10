import ActionLink from 'apps/Shop/components/ActionLink';
import ActivationBadge from 'apps/Shop/components/ActivationBadge';
import {ActivationStatus} from 'apps/Shop/types';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

const Product: SFC = ({}) => {
  return (
    <>
      <S.Thumbnail
        onClick={() => {}}
        thumbnailUrl="https://images.craigslist.org/00z0z_3uz5MSkNBPN_0t20CI_600x450.jpg"
      />
      <S.Details>
        <S.Name onClick={() => {}}>Product name</S.Name>
        <S.Description>{truncate('Product description will go here', 200)}</S.Description>
      </S.Details>
      <S.ActivationStatus>
        <ActivationBadge activationStatus={ActivationStatus.active} />
      </S.ActivationStatus>
      <S.Actions>
        <ActionLink onClick={() => {}}>Edit</ActionLink>
        <ActionLink onClick={() => {}}>Delete</ActionLink>
      </S.Actions>
    </>
  );
};

export default Product;
