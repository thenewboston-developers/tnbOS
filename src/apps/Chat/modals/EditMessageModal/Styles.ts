import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UModal from 'apps/Chat/components/Modal';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const Form = styled(UForm)`
  padding: 16px;
`;

export const Modal = styled(UModal)`
  width: 420px;
`;
