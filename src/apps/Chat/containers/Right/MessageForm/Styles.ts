import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'apps/Chat/components/Button';
import {InlineInput} from 'apps/Chat/components/FormElements';

export const AmountInput = styled(InlineInput)`
  margin-left: 12px;
  width: 80px;
`;

export const AttachmentContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 16px 16px;
`;

export const Button = styled(UButton)`
  display: none;
`;

export const ContentInput = styled(InlineInput)`
  flex: 1;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  padding: 0 16px 16px;
`;
