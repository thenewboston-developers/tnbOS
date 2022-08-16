import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, inputStyle} from 'apps/Chat/styles';

export const Field = styled(UField)`
  border: 1px solid ${({$error}) => ($error ? colors.error : 'transparent')};
  height: 44px;
  ${inputStyle};
`;
