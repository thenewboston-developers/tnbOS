import store from 'system/store';

export const generateNetworkUUID = () => {
  const {
    system: {self},
  } = store.getState();
  const uuid = crypto.randomUUID();
  return `${self.accountNumber}-${uuid}`;
};
