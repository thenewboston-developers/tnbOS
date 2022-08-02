import {SFC} from 'system/types';
import * as S from './Styles';

const ToolbarDivider: SFC = ({className}) => {
  return <S.Divider className={className} />;
};

export default ToolbarDivider;
