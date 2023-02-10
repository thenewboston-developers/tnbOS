import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import {SFC} from 'system/types';
import * as S from './Styles';

const SellProducts: SFC = ({className}) => {
  const renderAddProductButton = () => {
    return <Button iconLeft={mdiPlus} onClick={() => {}} text="Add" />;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Products" rightContent={renderAddProductButton()} />
    </S.Container>
  );
};

export default SellProducts;
