import {Dict, SFC} from 'system/types';
import * as S from './Styles';

export interface DetailListProps {
  label: string;
  values: Dict<string>;
}

const DetailList: SFC<DetailListProps> = ({className, label, values}) => {
  const getKeyDisplayText = (key: string) => {
    const displayKeys: Dict<string> = {
      artworkId: 'Artwork ID',
      blockId: 'Block ID',
      createdDate: 'Created',
      creator: 'Creator',
      description: 'Description',
      imageUrl: 'Image URL',
      inTransfer: 'In Transfer',
      modifiedDate: 'Modified',
      name: 'Name',
      owner: 'Owner',
    };

    return displayKeys[key];
  };

  const renderValues = () => {
    return Object.entries(values).map(([key, value]) => (
      <S.Value key={key}>{`${getKeyDisplayText(key)}: ${value}`}</S.Value>
    ));
  };

  return (
    <S.Container className={className}>
      <S.Label>{label}</S.Label>
      {renderValues()}
    </S.Container>
  );
};

export default DetailList;
