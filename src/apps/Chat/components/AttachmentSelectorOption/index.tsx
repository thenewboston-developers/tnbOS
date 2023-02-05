import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AttachmentSelectorOptionProps {
  icon: string;
  onClick: GenericVoidFunction;
  text: string;
}

const AttachmentSelectorOption: SFC<AttachmentSelectorOptionProps> = ({className, icon, onClick, text}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Icon path={icon} size="26px" />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default AttachmentSelectorOption;
