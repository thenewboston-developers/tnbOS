import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['300']};
  font-size: 11px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  border-radius: 3px;
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['300'] : '#ced4da')};
  display: block;
  font-family: Poppins, sans-serif;
  min-width: 200px;
  padding: 8px 12px;
  width: 100%;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const FieldWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const Label = styled.div`
  font-size: 13px;
  margin-bottom: 8px;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 20px;
  margin-left: 12px;
  width: 20px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
