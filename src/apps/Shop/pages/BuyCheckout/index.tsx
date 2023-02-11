import {mdiDotsVertical} from '@mdi/js';

import {useCartProductList} from 'apps/Shop/hooks';
import DropdownMenu from 'system/components/DropdownMenu';
import {SFC} from 'system/types';

import CartProduct from './CartProduct';
import * as S from './Styles';

const BuyCheckout: SFC = ({className}) => {
  const cartProductList = useCartProductList();

  const handleEditAddressClick = () => {
    console.log('Edit address modal');
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
    const menuOptions = [{label: 'Edit', onClick: handleEditAddressClick}];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
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
    const _cartProducts = cartProductList.map((product) => <CartProduct key={product.productId} product={product} />);
    return (
      <>
        <S.Heading>Products</S.Heading>
        <S.Line />
        <S.CartProducts>{_cartProducts}</S.CartProducts>
      </>
    );
  };

  const renderRight = () => {
    return (
      <S.Right>
        <h1>payment</h1>
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      {renderLeft()}
      {renderRight()}
    </S.Container>
  );
};

export default BuyCheckout;
