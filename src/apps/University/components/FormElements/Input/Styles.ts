import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const ErrorMessage = styled.div`
  color: ${colors.fonts.error};
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? colors.fonts.error : '#ebebeb')};
  display: block;
  height: 40px;
  outline: 0;
  padding: 0 12px;
  transition: all 0.15s ease-in-out;
  width: 100%;

  &:focus {
    border: 1px solid ${({$error}) => ($error ? colors.fonts.error : colors.palette.blue['200'])};
  }

  &:hover:not(:focus) {
    border: 1px solid ${({$error}) => ($error ? colors.fonts.error : '#cbd0d9')};
  }
`;

export const Label = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
