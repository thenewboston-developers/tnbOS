import MainArea from 'apps/Shop/containers/MainArea';
import Top from 'apps/Shop/containers/Top';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const Shop: SFC<AppProps> = ({className, display}) => {
  if (!display) return null;

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <Top />
        <MainArea />
      </S.Container>
    </AppWindow>
  );
};

export default Shop;
