import {useState} from 'react';
import {mdiDelete} from '@mdi/js';

import Tool from 'apps/Chat/components/Tool';
import {useAccountDisplayImage, useAccountDisplayName} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AccountAttachmentProps {
  accountNumber: string;
}

const AccountAttachment: SFC<AccountAttachmentProps> = ({accountNumber, className}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const displayImage = useAccountDisplayImage(accountNumber);
  const displayName = useAccountDisplayName(accountNumber, 10);

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
        <Tool icon={mdiDelete} onClick={() => {}} />
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

export default AccountAttachment;
