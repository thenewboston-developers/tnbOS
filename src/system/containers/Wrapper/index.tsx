import {FC, ReactNode} from 'react';

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
      {welcomeModalIsOpen ? <WelcomeModal close={toggleWelcomeModal} /> : null}
    </>
  );
};

export default Wrapper;
