import ToolbarDivider from 'system/components/ToolbarDivider';
import ToolbarItemContainer from 'system/components/ToolbarItemContainer';
import {SFC} from 'system/types';
import Avatar from './Avatar';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <ToolbarItemContainer>
        <Avatar />
      </ToolbarItemContainer>
      <ToolbarDivider />
    </S.Container>
  );
};

export default Left;
