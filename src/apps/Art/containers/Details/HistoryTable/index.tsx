import React from 'react';
import {useSelector} from 'react-redux';

import AccountLabel from 'apps/Art/components/AccountLabel';
import Detail from 'apps/Art/components/Detail';
import DetailList from 'apps/Art/components/DetailList';
import {useOrderedBlockChain} from 'apps/Art/hooks';
import {getArtworks} from 'apps/Art/selectors/state';
import {ArtworkAttributes} from 'apps/Art/types';
import {formatDate} from 'apps/Art/utils/dates';
import {Dict, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface HistoryTableProps {
  artworkId: string;
}

const HistoryTable: SFC<HistoryTableProps> = ({artworkId, className}) => {
  const artworks = useSelector(getArtworks);
  const orderedBlockChain = useOrderedBlockChain(artworkId);

  const getCleanPayload = (payload: Partial<ArtworkAttributes>) => {
    const displayValues: Dict<(value: any) => string> = {
      artworkId: (value: string) => truncate(value, 32),
      blockId: (value: string) => truncate(value, 32),
      createdDate: (value: string) => formatDate(value),
      creator: (value: string) => truncate(value, 32),
      description: (value: string) => truncate(value, 32),
      imageUrl: (value: string) => truncate(value, 32),
      inTransfer: (value: boolean) => (value ? 'True' : 'False'),
      modifiedDate: (value: string) => formatDate(value),
      name: (value: string) => truncate(value, 32),
      owner: (value: string) => truncate(value, 32),
    };

    return Object.entries(payload).reduce((previousValue, [key, value]) => {
      const displayFunction = displayValues[key];

      if (['artworkId', 'blockId', 'createdDate', 'modifiedDate', 'owner'].includes(key)) return previousValue;

      return {
        ...previousValue,
        [key]: displayFunction(value),
      };
    }, {});
  };

  const renderRows = () => {
    return Object.values(orderedBlockChain).map((block) => {
      const {payload} = block;

      const artwork = artworks[artworkId];
      const isGenesisBlock = block.hasOwnProperty('artworkIdPayload');
      const isCreator = payload.owner === artwork.attributes.creator;

      return (
        <React.Fragment key={payload.blockId}>
          <AccountLabel accountNumber={payload.owner} label={isCreator ? 'Creator' : 'Owner'} />
          <DetailList label={isGenesisBlock ? 'Created' : 'Updated'} values={getCleanPayload(payload)} />
          <Detail label="Date" value={formatDate(payload.modifiedDate)} />
        </React.Fragment>
      );
    });
  };

  return <S.Container className={className}>{renderRows()}</S.Container>;
};

export default HistoryTable;
