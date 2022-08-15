import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';

export const Field = styled(UField)`
  background: #40444b;
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? colors.error : 'transparent')};
  color: ${fonts.color.default};
  font-family: ${fonts.family.default};
  font-size: 14px;
  height: 44px;
  outline: 0;
  padding: 10px 14px;
`;
