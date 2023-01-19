import {PublicationStatus} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PublicationBadgeProps {
  publicationStatus: PublicationStatus;
}

const PublicationBadge: SFC<PublicationBadgeProps> = ({className, publicationStatus}) => {
  return (
    <S.Container className={className} publicationStatus={publicationStatus}>
      {publicationStatus}
    </S.Container>
  );
};

export default PublicationBadge;
