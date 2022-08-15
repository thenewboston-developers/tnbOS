import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';

export const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  background: #40444b;
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? colors.error : 'transparent')};
  color: ${fonts.color.default};
  font-family: ${fonts.family.default};
  font-size: 14px;
  display: block;
  height: 44px;
  outline: 0;
  padding: 10px 14px;
  width: 100%;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
