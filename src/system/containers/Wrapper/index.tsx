import {FC, ReactNode} from 'react';

import Layout from 'system/containers/Layout';

const Wrapper: FC = () => {
  const renderLayout = (): ReactNode => {
    return <Layout />;
  };

  return <>{renderLayout()}</>;
};

export default Wrapper;
