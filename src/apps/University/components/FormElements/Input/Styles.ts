import {Field as UField} from 'formik';
import styled from 'styled-components';

export const ErrorMessage = styled.div`
  color: #f46a6a;
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? '#f46a6a' : '#ced4da')};
  display: block;
  height: 40px;
  outline: 0;
  padding: 0 12px;
  width: 100%;

  &:focus {
    border: 1px solid ${({$error}) => ($error ? '#f46a6a' : '#006699')};
  }
`;

export const Label = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 8px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
