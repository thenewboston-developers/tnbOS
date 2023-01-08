import {useSelector} from 'react-redux';

import DefaultAvatar from 'system/assets/default-avatar.png';
import {getAccounts, getSelf} from 'system/selectors/state';

const useAccountDisplayImage = (accountNumber: string) => {
  const accounts = useSelector(getAccounts);
  const self = useSelector(getSelf);

  const account = self.accountNumber === accountNumber ? self : accounts[accountNumber];

  return account?.displayImage || DefaultAvatar;
};

export default useAccountDisplayImage;
