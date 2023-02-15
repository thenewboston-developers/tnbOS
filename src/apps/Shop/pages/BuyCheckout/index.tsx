import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import {createOrderBlock} from 'apps/Shop/blocks';
import AccountLabel from 'apps/Shop/components/AccountLabel';
import Button from 'apps/Shop/components/Button';
import DropdownMenu from 'system/components/DropdownMenu';
import {APPROVAL_WINDOW_SECONDS, PAYMENT_WINDOW_SECONDS} from 'apps/Shop/constants/protocol';
import {useCartProductList, useCartSeller} from 'apps/Shop/hooks';
import AddressSelectModal from 'apps/Shop/modals/AddressSelectModal';
import {getAddresses} from 'apps/Shop/selectors/state';
import {resetCartProducts} from 'apps/Shop/store/cartProducts';
import {setActivePage} from 'apps/Shop/store/manager';
import {setOrderProductList} from 'apps/Shop/store/orderProducts';
import {setOrder} from 'apps/Shop/store/orders';
import {Address, ApprovalStatus, Page, PaymentStatus, ShippingStatus} from 'apps/Shop/types';
import {useToggle} from 'system/hooks';
import {getBalances, getNetworkAccountOnlineStatuses, getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {sortAttributesAlphabetically} from 'system/utils/attributes';
import {systemDate} from 'system/utils/dates';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast} from 'system/utils/toast';
import {generateNetworkUUID} from 'system/utils/uuid';

import CartProduct from './CartProduct';
import PaymentDetails from './PaymentDetails';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const addresses = useSelector(getAddresses);
  const balances = useSelector(getBalances);
  const cartProductList = useCartProductList();
  const cartSeller = useCartSeller();
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const self = useSelector(getSelf);

  useEffect(() => {
    const addressIds = Object.keys(addresses);
    if (!!addressIds.length) setSelectedAddressId(addressIds[0]);
  }, [addresses]);

  const isPlaceOrderButtonDisabled = useMemo(() => {
    return !cartProductList.length || !selectedAddressId;
  }, [cartProductList.length, selectedAddressId]);

  const totalPrice = useMemo(() => {
    return cartProductList.reduce((previousValue, product) => previousValue + product.priceAmount, 0);
  }, [cartProductList]);

  const handlePlaceOrderClick = async (): Promise<void> => {
    const now = new Date();

    const address: Address = sortAttributesAlphabetically(addresses[selectedAddressId!]);
    const approvalExpirationDate = new Date(now.getTime() + APPROVAL_WINDOW_SECONDS * 1000);
    const orderId = generateNetworkUUID();
    const paymentExpirationDate = new Date(now.getTime() + PAYMENT_WINDOW_SECONDS * 1000);
    const productIds = cartProductList.map(({productId}) => productId);
    const seller = cartProductList[0].seller;

    const order = {
      address,
      approvalExpirationDate: systemDate(approvalExpirationDate),
      approvalStatus: ApprovalStatus.pending,
      buyer: self.accountNumber,
      createdDate: systemDate(now),
      networkId: cartProductList[0].priceNetwork,
      orderId,
      paymentExpirationDate: systemDate(paymentExpirationDate),
      paymentStatus: PaymentStatus.none,
      productIds,
      receivingAddress: null,
      seller,
      shippingStatus: ShippingStatus.notShipped,
      total: totalPrice,
    };

    const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
      balances,
      networkAccountOnlineStatuses,
      recipient: seller,
    });

    if (!recipientsDefaultNetworkId) {
      displayErrorToast('Unable to connect to seller');
      return;
    }

    dispatch(setOrderProductList(cartProductList));
    dispatch(setOrder(order));
    dispatch(resetCartProducts());

    try {
      await createOrderBlock({
        networkId: recipientsDefaultNetworkId,
        params: order,
        recipient: seller,
      });

      dispatch(setActivePage(Page.buyOrders));
    } catch (error) {
      console.error(error);
    }
  };

  const renderAddressSelectModal = () => {
    if (!addressSelectModalIsOpen) return null;
    return <AddressSelectModal close={toggleAddressSelectModal} setAddressId={setSelectedAddressId} />;
  };

  const renderAddress = () => {
    let content = <Button onClick={toggleAddressSelectModal} text="Select Address" />;

    if (selectedAddressId) {
      const address = addresses[selectedAddressId];
      content = <S.AddressCard address={address} rightContent={renderAddressDropdownMenu()} />;
    }

    return (
      <S.Address>
        <S.Heading>Address</S.Heading>
        <S.Line />
        {content}
      </S.Address>
    );
  };

  const renderAddressDropdownMenu = () => {
    const menuOptions = [{label: 'Edit', onClick: toggleAddressSelectModal}];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderCartProducts = () => {
    const _cartProducts = cartProductList.map((product) => <CartProduct key={product.productId} product={product} />);
    return <S.CartProducts>{_cartProducts}</S.CartProducts>;
  };

  const renderLeft = () => {
    return (
      <S.Left>
        <S.LeftTop>
          {renderAddress()}
          {renderParticipants()}
        </S.LeftTop>
        {renderProducts()}
      </S.Left>
    );
  };

  const renderParticipants = () => {
    const content = !!cartProductList.length ? (
      <>
        <AccountLabel label="Buyer" accountNumber={self.accountNumber} />
        {cartSeller && <S.AccountLabel label="Seller" accountNumber={cartSeller} />}
      </>
    ) : (
      <S.EmptyText>No buyer or seller to display.</S.EmptyText>
    );

    return (
      <S.Participants>
        <S.Heading>Participants</S.Heading>
        <S.Line />
        {content}
      </S.Participants>
    );
  };

  const renderProducts = () => {
    const content = !!cartProductList.length ? (
      renderCartProducts()
    ) : (
      <S.EmptyText>No products to display.</S.EmptyText>
    );

    return (
      <>
        <S.Heading>Products</S.Heading>
        <S.Line />
        {content}
      </>
    );
  };

  const renderRight = () => {
    const networkId = !!cartProductList.length ? cartProductList[0].priceNetwork : null;
    return (
      <S.Right>
        <S.Heading>Total</S.Heading>
        <S.Line />
        <PaymentDetails
          handlePlaceOrderClick={handlePlaceOrderClick}
          isButtonDisabled={isPlaceOrderButtonDisabled}
          networkId={networkId}
          totalPrice={totalPrice}
        />
      </S.Right>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderLeft()}
        {renderRight()}
      </S.Container>
      {renderAddressSelectModal()}
    </>
  );
};

export default BuyCheckout;
