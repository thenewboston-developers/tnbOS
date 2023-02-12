import {mdiDotsVertical} from '@mdi/js';

import {useCartProductList} from 'apps/Shop/hooks';
import DropdownMenu from 'system/components/DropdownMenu';
import AddressSelectModal from 'apps/Shop/modals/AddressSelectModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import CartProduct from './CartProduct';
import PaymentDetails from './PaymentDetails';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const [addressSelectModalIsOpen, toggleAddressSelectModal] = useToggle(false);
  const cartProductList = useCartProductList();

  const renderAddressSelectModal = () => {
    if (!addressSelectModalIsOpen) return null;
    return <AddressSelectModal close={toggleAddressSelectModal} />;
  };

  const renderAddress = () => {
    const address = {
      address1: '423',
      address2: 'rewqrwe eqw',
      addressId: 'rrewrweqr',
      city: 'LIC',
      countryCode: 'US',
      fullName: 'Bucky',
      state: 'NY',
      zipCode: '43245',
    };

    return (
      <>
        <S.Heading>Address</S.Heading>
        <S.Line />
        <S.AddressCard address={address} rightContent={renderAddressDropdownMenu()} />
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
        <PaymentDetails />
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
