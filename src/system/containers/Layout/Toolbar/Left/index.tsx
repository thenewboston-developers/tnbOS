import ToolbarItemContainer from 'system/components/ToolbarItemContainer';
import Divider from 'system/containers/Layout/Toolbar/Divider';
import {SFC} from 'system/types';
import Avatar from './Avatar';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <ToolbarItemContainer>
        <Avatar />
      </ToolbarItemContainer>
      <Divider />
    </S.Container>
  );
};

export default Left;
