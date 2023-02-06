import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ToolsProps {
  icon: string;
  onClick: GenericVoidFunction;
}

const Tool: SFC<ToolsProps> = ({className, icon, onClick}) => {
  return <S.Container className={className} icon={icon} onClick={onClick} size={20} totalSize="unset" unfocusable />;
};

export default Tool;
