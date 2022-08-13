import {FC, ReactNode, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {IpcChannel, LocalElectronStore} from 'shared/types';
import Layout from 'system/containers/Layout';
import {useReadIpc, useToggle} from 'system/hooks';
import WelcomeModal from 'system/modals/WelcomeModal';
import {getSelf, getStoreLoaded} from 'system/selectors/state';
import {initialState as accountsInitialState, setAccounts} from 'system/store/accounts';
import {initializeBalances, initialState as balancesInitialState, setBalances} from 'system/store/balances';
import {
  SYSTEM_ACCOUNTS,
  SYSTEM_BALANCES,
  SYSTEM_MANAGER,
  SYSTEM_NETWORKS,
  SYSTEM_SELF,
  SYSTEM_SOCKET_STATUSES,
} from 'system/store/constants';
import {initialState as managerInitialState, setManager} from 'system/store/manager';
import {initialState as networksInitialState, setNetworks} from 'system/store/networks';
import {initialState as selfInitialState, setSelf} from 'system/store/self';
import {
  initializeSocketStatuses,
  initialState as socketStatusesInitialState,
  setSocketStatuses,
} from 'system/store/socketStatuses';
import {setStoreLoadedTrue} from 'system/store/internal';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {generateAccount} from 'system/utils/tnb';

const loadStoreFailToast = (_: any, errorMessage: string) => {
  displayErrorToast(`Could not load store data: ${errorMessage}`);
};

const Wrapper: FC = () => {
  const [welcomeModalIsOpen, toggleWelcomeModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const storeLoaded = useSelector(getStoreLoaded);

  const loadStoreSuccessCallback = useCallback(
    (store: LocalElectronStore) => {
      if (storeLoaded) return;

      // System data
      const storeAccounts = store?.[SYSTEM_ACCOUNTS] || accountsInitialState;
      const storeBalances = store?.[SYSTEM_BALANCES] || balancesInitialState;
      const storeManager = store?.[SYSTEM_MANAGER] || managerInitialState;
      const storeNetworks = store?.[SYSTEM_NETWORKS] || networksInitialState;
      const storeSelf = store?.[SYSTEM_SELF] || selfInitialState;
      const storeSocketStatuses = store?.[SYSTEM_SOCKET_STATUSES] || socketStatusesInitialState;
      dispatch(setAccounts(storeAccounts));
      dispatch(setBalances(storeBalances));
      dispatch(setManager(storeManager));
      dispatch(setNetworks(storeNetworks));
      dispatch(setSelf(storeSelf));
      dispatch(setSocketStatuses(storeSocketStatuses));

      // System initialization
      dispatch(initializeBalances());
      dispatch(initializeSocketStatuses());

      // Signal completion
      dispatch(setStoreLoadedTrue());

      if (!storeSelf.accountNumber) {
        const {publicKeyHex, signingKeyHex} = generateAccount();
        dispatch(setSelf({accountNumber: publicKeyHex, displayImage: '', displayName: '', signingKey: signingKeyHex}));
        toggleWelcomeModal();
      }
    },
    [dispatch, storeLoaded, toggleWelcomeModal],
  );

  const loadStoreData = useReadIpc({
    channel: IpcChannel.loadStoreData,
    failCallback: loadStoreFailToast,
    successCallback: loadStoreSuccessCallback,
  });

  useEffect(() => {
    loadStoreData();
  }, [loadStoreData]);

  const renderLayout = (): ReactNode => {
    if (!self.accountNumber || !storeLoaded) return null;
    return <Layout />;
  };

  return (
    <>
      {renderLayout()}
      <ToastContainer
        autoClose={3000}
        closeOnClick
        draggable
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        transition={Flip}
      />
      {welcomeModalIsOpen ? <WelcomeModal close={toggleWelcomeModal} /> : null}
    </>
  );
};

export default Wrapper;
