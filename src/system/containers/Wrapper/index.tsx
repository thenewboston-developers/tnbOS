import {FC, ReactNode} from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from 'system/containers/Layout';
import WelcomeModal from 'system/containers/WelcomeModal';
import {useToggle} from 'system/hooks';

const Wrapper: FC = () => {
  const [welcomeModalIsOpen, toggleWelcomeModal] = useToggle(true);

  const renderLayout = (): ReactNode => {
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
