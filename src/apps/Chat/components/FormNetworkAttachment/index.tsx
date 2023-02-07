import {useState} from 'react';
import {mdiDelete} from '@mdi/js';

import * as S from 'apps/Chat/components/_FormAttachment/Styles';
import Tool from 'apps/Chat/components/Tool';
import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage, useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';

export interface FormNetworkAttachmentProps {
  attachedNetworkIds: string[];
  networkId: string;
  setAttachedNetworkIds: GenericVoidFunction;
}

const FormNetworkAttachment: SFC<FormNetworkAttachmentProps> = ({
  attachedNetworkIds,
  className,
  networkId,
  setAttachedNetworkIds,
}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const displayImage = useNetworkDisplayImage(networkId);
  const displayName = useNetworkDisplayName(networkId);

  const handleDeleteClick = () => {
    const results = attachedNetworkIds.filter((item) => item !== networkId);
    setAttachedNetworkIds(results);
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
  };

  const renderTools = () => {
    if (!toolsVisible) return null;
    return (
      <S.Tools>
        <Tool icon={mdiDelete} onClick={handleDeleteClick} />
      </S.Tools>
    );
  };

  return (
    <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      <S.Img alt="display image" src={displayImage} />
      <S.Text>{displayName}</S.Text>
      {renderTools()}
    </S.Container>
  );
};

export default FormNetworkAttachment;
