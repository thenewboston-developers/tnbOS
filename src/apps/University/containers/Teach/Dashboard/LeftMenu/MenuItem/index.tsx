import {useDispatch, useSelector} from 'react-redux';

import {getActiveTeachPage} from 'apps/University/selectors/state';
import {setActiveTeachPage} from 'apps/University/store/manager';
import {TeachPage} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface MenuItemProps {
  icon: string;
  page: TeachPage;
  text: string;
}

const MenuItem: SFC<MenuItemProps> = ({className, icon, page, text}) => {
  const activeTeachPage = useSelector(getActiveTeachPage);
  const dispatch = useDispatch<AppDispatch>();

  const isActivePage = activeTeachPage === page;

  const handleClick = () => {
    dispatch(setActiveTeachPage(page));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage}>{text}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
