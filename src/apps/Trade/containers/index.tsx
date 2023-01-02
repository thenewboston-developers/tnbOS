import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Trade/styles/fonts.css';

const Trade: SFC<AppProps> = ({className, display}) => {
  return (
    <AppWindow className={className} display={display}>
      <S.Container>Trade</S.Container>
    </AppWindow>
  );
};

export default Trade;
