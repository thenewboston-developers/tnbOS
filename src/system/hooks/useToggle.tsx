import {useReducer} from 'react';

const toggleReducer = (currentValue: boolean, newValue: boolean | undefined) => {
  return typeof newValue === 'boolean' ? newValue : !currentValue;
};

// dispatch's param value is typed as any so that this can be passed as an onClick event handler
const useToggle = (initialValue: boolean): [state: boolean, dispatch: (value?: any) => void] => {
  return useReducer(toggleReducer, initialValue);
};

export default useToggle;
