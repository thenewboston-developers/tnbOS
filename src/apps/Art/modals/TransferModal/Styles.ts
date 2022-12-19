import styled from 'styled-components';

import UButton from 'apps/Art/components/Button';
import UModal from 'apps/Art/components/Modal';

export const AccountSelectCards = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 420px;
  overflow-y: auto;
`;

export const Button = styled(UButton)`
  margin-top: 16px;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 380px;
`;
