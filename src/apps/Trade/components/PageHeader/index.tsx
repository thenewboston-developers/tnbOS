import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

interface PageHeaderProps {
  rightContent?: ReactNode;
  title: string;
}

const PageHeader: SFC<PageHeaderProps> = ({className, rightContent, title}) => {
  return (
    <S.Container className={className}>
      <S.Left>{title}</S.Left>
      {rightContent ? <S.Right>{rightContent}</S.Right> : null}
    </S.Container>
  );
};

export default PageHeader;
