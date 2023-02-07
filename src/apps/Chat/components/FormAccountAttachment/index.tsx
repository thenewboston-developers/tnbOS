import {useState} from 'react';
import {mdiDelete} from '@mdi/js';

import * as S from 'apps/Chat/components/_FormAttachment/Styles';
import Tool from 'apps/Chat/components/Tool';
import {GenericVoidFunction} from 'shared/types';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';

export interface FormAccountAttachmentProps {
  accountNumber: string;
  attachedAccountNumbers: string[];
  setAttachedAccountNumbers: GenericVoidFunction;
}

const FormAccountAttachment: SFC<FormAccountAttachmentProps> = ({
  accountNumber,
  attachedAccountNumbers,
  className,
  setAttachedAccountNumbers,
}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 10);

  const handleDeleteClick = () => {
    const results = attachedAccountNumbers.filter((item) => item !== accountNumber);
    setAttachedAccountNumbers(results);
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

export default FormAccountAttachment;
