import {ReactNode} from 'react';
import {toast} from 'react-toastify';

import Toast from 'system/components/Toast';
import {ToastType} from 'system/types';

export const displayErrorToast = (error: any) => {
  let errorStr: string;

  if (typeof error === 'string') {
    errorStr = error;
  } else if (error?.response?.data) {
    errorStr = JSON.stringify(error.response.data);
  } else if (error?.message) {
    errorStr = error.message;
  } else {
    errorStr = JSON.stringify(error);
  }

  displayToast(errorStr, ToastType.error);
};

export const displayToast = (message: ReactNode, type: ToastType, className?: string): void => {
  toast(
    <Toast className={className} type={type}>
      {message}
    </Toast>,
  );
};

export const loadStoreFailToast = (_: any, errorMessage: string) => {
  displayErrorToast(`Could not load store data: ${errorMessage}`);
};
