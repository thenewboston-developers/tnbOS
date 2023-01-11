import {SFC} from 'system/types';

import Navigation from './Navigation';
import * as S from './Styles';

const Learn: SFC = ({className}) => {
  const renderBreadcrumbs = () => {
    return <div>Breadcrumbs</div>;
  };

  const renderMainContent = () => {
    return (
      <S.MainContent>
        <h1>Main content</h1>
        <h1>Main content</h1>
        <h1>Main content</h1>
        <h1>Main content</h1>
        <h1>Main content</h1>
        <h1>Main content</h1>
        <h1>Main content</h1>
      </S.MainContent>
    );
  };

  return (
    <S.Container className={className}>
      <Navigation />
      {renderBreadcrumbs()}
      {renderMainContent()}
    </S.Container>
  );
};

export default Learn;
