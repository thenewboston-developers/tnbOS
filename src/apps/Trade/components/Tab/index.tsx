import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import {getActiveWalletTab} from 'apps/Trade/selectors/state';
import {WalletTab} from 'apps/Trade/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface TabProps {
  children: ReactNode;
  onClick: GenericVoidFunction;
  walletTab: WalletTab;
}

const Tab: SFC<TabProps> = ({children, className, onClick, walletTab}) => {
  const activeWalletTab = useSelector(getActiveWalletTab);

  return (
    <S.Tab className={className} isActive={activeWalletTab === walletTab} onClick={() => onClick(walletTab)}>
      {children}
    </S.Tab>
  );
};

export default Tab;
