import noop from 'lodash/noop';

import Identification from 'apps/SpeedTest/components/Identification';
import SelectCard from 'apps/SpeedTest/components/SelectCard';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AccountModalProps {
  close(): void;
}

const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
  return (
    <S.Modal className={className} close={close} header="Select Account">
      <SelectCard isSelected={false} onClick={noop}>
        <Identification />
      </SelectCard>
      <SelectCard isSelected={true} onClick={noop}>
        <Identification />
      </SelectCard>
    </S.Modal>
  );
};

export default AccountModal;
