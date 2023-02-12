import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import DropdownMenu from 'system/components/DropdownMenu';
import {APPROVAL_WINDOW_SECONDS, PAYMENT_WINDOW_SECONDS} from 'apps/Shop/constants/protocol';
import {useCartProductList} from 'apps/Shop/hooks';
import AddressSelectModal from 'apps/Shop/modals/AddressSelectModal';
import {getAddresses} from 'apps/Shop/selectors/state';
import {setOrder} from 'apps/Shop/store/orders';
import {ApprovalStatus, PaymentStatus} from 'apps/Shop/types';
import {useToggle} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import {systemDate} from 'system/utils/dates';

import CartProduct from './CartProduct';
import PaymentDetails from './PaymentDetails';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const addresses = useSelector(getAddresses);
  const cartProductList = useCartProductList();
  const dispatch = useDispatch<AppDispatch>();
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

  const handlePlaceOrderClick = () => {
    const address = addresses[selectedAddressId!];
    const orderId = crypto.randomUUID();

    const now = new Date();
    const approvalExpirationDate = new Date(now.getTime() + APPROVAL_WINDOW_SECONDS * 1000);
    const paymentExpirationDate = new Date(now.getTime() + PAYMENT_WINDOW_SECONDS * 1000);

    const productIds = cartProductList.map(({productId}) => productId);

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
      seller: cartProductList[0].seller,
      total: totalPrice,
    };

    dispatch(setOrder(order));
    // empty cart
    // redirect to orders page
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
      <>
        <S.Heading>Address</S.Heading>
        <S.Line />
        <S.AddressContent>{content}</S.AddressContent>
      </>
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
        {renderAddress()}
        {renderProducts()}
      </S.Left>
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
    return (
      <S.Right>
        <S.Heading>Total</S.Heading>
        <S.Line />
        <PaymentDetails
          handlePlaceOrderClick={handlePlaceOrderClick}
          isButtonDisabled={isPlaceOrderButtonDisabled}
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
