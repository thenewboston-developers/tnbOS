import {FC, ReactNode, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {IpcChannel, LocalElectronStore} from 'shared/types';
import Layout from 'system/containers/Layout';
import {useReadIpc, useToggle} from 'system/hooks';
import WelcomeModal from 'system/modals/WelcomeModal';
import {SYSTEM_MANAGER, SYSTEM_SELF} from 'system/store/constants';
import {initialState as managerInitialState, setManager} from 'system/store/manager';
import {initialState as selfInitialState, setSelf} from 'system/store/self';
import {getSelf, getStoreLoaded} from 'system/selectors/state';
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

      // System
      const storeManager = store?.[SYSTEM_MANAGER] || managerInitialState;
      const storeSelf = store?.[SYSTEM_SELF] || selfInitialState;
      dispatch(setManager(storeManager));
      dispatch(setSelf(storeSelf));

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
