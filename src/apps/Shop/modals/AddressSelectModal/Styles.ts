import styled from 'styled-components';

import UButton from 'apps/Shop/components/Button';
import UModal from 'apps/Shop/components/Modal';

export const AddressSelectCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  max-height: 420px;
  overflow-y: auto;
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const Modal = styled(UModal)`
  min-width: 420px;
`;
