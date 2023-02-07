import styled from 'styled-components';

import UModal from 'apps/Chat/components/Modal';
import {scrollStyle} from 'apps/Chat/styles';

export const AccountCardsContainer = styled.div`
  max-height: 320px;
  overflow-y: scroll;
  ${scrollStyle};
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-width: 400px;
`;
