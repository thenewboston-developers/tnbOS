import styled from 'styled-components';

import UModal from 'apps/Trade/components/Modal';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 480px;
  max-width: 500px;
`;

export const RadioCardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 24px;
`;
