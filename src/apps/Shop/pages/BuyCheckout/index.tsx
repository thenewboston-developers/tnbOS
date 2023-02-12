import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import DropdownMenu from 'system/components/DropdownMenu';
import {useCartProductList} from 'apps/Shop/hooks';
import AddressSelectModal from 'apps/Shop/modals/AddressSelectModal';
import {getAddresses} from 'apps/Shop/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import CartProduct from './CartProduct';
import PaymentDetails from './PaymentDetails';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const addresses = useSelector(getAddresses);
  const cartProductList = useCartProductList();

  useEffect(() => {
    const addressIds = Object.keys(addresses);
    if (!!addressIds.length) setSelectedAddressId(addressIds[0]);
  }, [addresses]);

  const isPlaceOrderButtonDisabled = useMemo(() => {
    return !cartProductList.length || !selectedAddressId;
  }, [cartProductList.length, selectedAddressId]);

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
        <PaymentDetails isButtonDisabled={isPlaceOrderButtonDisabled} />
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
