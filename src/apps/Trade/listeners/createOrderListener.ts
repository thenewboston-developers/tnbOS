import approveOrderBlock from 'apps/Trade/blocks/approveOrderBlock';
import {approveOrder, setOrder} from 'apps/Trade/store/orders';
import {setReceivingAccount} from 'apps/Trade/store/receivingAccounts';
import {Order} from 'apps/Trade/types';
import {placeHoldOnCrypto} from 'apps/Trade/utils/holds';
import {validateBlockSenderIsOrderClient, validateReceivingAddressIsUnique} from 'apps/Trade/validators/common';
import {
  createOrderValidator,
  validateApprovalExpirationDateIsCorrectValue,
  validateClientIsNotHost,
  validateHostIsSelf,
  validateOfferExists,
  validateOrderIdIsUnique,
  validateOutgoingAmounts,
  validateOutgoingAssetBalance,
  validatePaymentExpirationDateIsCorrectValue,
  validateUserBuyingClientAsset,
  validateUserSellingClientAsset,
} from 'apps/Trade/validators/createOrderValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {generateAccount} from 'system/utils/tnb';
import {displayErrorToast} from 'system/utils/toast';

const createOrderListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {balances, self},
        trade,
      } = store.getState();
      const {holdingAccounts, offers, orders} = trade;

      await createOrderValidator.validate(params);
      const order: Order = params;
      const {approvalExpirationDate, client, createdDate, host, orderId, paymentExpirationDate} = order;

      const {isUserBuyingClientAsset, isUserSellingClientAsset, offer} = validateOfferExists(offers, order);
      if (isUserBuyingClientAsset) validateUserBuyingClientAsset(offer, order);
      if (isUserSellingClientAsset) validateUserSellingClientAsset(offer, order);

      validateApprovalExpirationDateIsCorrectValue(approvalExpirationDate, createdDate);
      validateBlockSenderIsOrderClient(blockSender, client);
      validateClientIsNotHost(client, host);
      validateHostIsSelf(host, self);
      validateOrderIdIsUnique(orderId, orders);
      validateOutgoingAmounts(order);
      validateOutgoingAssetBalance(balances, holdingAccounts, host);
      validatePaymentExpirationDateIsCorrectValue(createdDate, paymentExpirationDate);
      validateReceivingAddressIsUnique(orders, client.receivingAddress);

      const keypair = generateAccount();

      await placeHoldOnCrypto(host.outgoingAmount, orderId, host.outgoingAsset);

      dispatch(setOrder(order));
      dispatch(
        setReceivingAccount({
          accountNumber: keypair.publicKeyHex,
          fundsTransferredOut: false,
          orderId,
          signingKey: keypair.signingKeyHex,
        }),
      );

      const approveOrderParams = {
        hostReceivingAddress: keypair.publicKeyHex,
        orderId,
      };
      dispatch(approveOrder(approveOrderParams));

      await approveOrderBlock({
        networkId,
        params: approveOrderParams,
        recipient: blockSender,
      });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default createOrderListener;
