import styled from 'styled-components';

import UModal from 'apps/Chat/components/Modal';
import {scrollStyle} from 'apps/Chat/styles';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 4px; // width of scrollStyle
  padding: 12px 16px;
`;

export const Container = styled.div``;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-width: 400px;
`;

export const NetworkSelectCardsContainer = styled.div`
  max-height: 320px;
  overflow-y: scroll;
  padding: 8px 16px 0;
  ${scrollStyle};
`;
