import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, inputStyle} from 'apps/Chat/styles';

export const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  border: 1px solid ${({$error}) => ($error ? colors.error : 'transparent')};
  display: block;
  width: 100%;
  ${inputStyle};
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
