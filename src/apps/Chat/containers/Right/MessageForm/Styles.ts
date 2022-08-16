import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'apps/Chat/components/Button';
import {InlineInput} from 'apps/Chat/components/FormElements';

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
