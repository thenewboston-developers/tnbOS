import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'apps/Art/styles';

export const ErrorMessage = styled.div`
  color: ${colors.error};
  font-size: 10px;
  margin-top: 6px;
`;

export const Field = styled(UField)`
  background: #18191b;
  border-radius: 4px;
  border: 1px solid ${({$error}) => ($error ? colors.error : '#ffffff33')};
  color: rgba(255, 255, 255, 0.9);
  display: block;
  height: 40px;
  outline: 0;
  padding: 0 12px;
  width: 100%;

  &:focus {
    border: 1px solid ${({$error}) => ($error ? colors.error : colors.palette.blue['500'])};
  }

  &:hover:not(:focus) {
    border: 1px solid ${({$error}) => ($error ? colors.error : '#ffffff66')};
  }
`;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 8px;
`;

export const SecondaryContainer = styled.div`
  margin-bottom: 24px;
`;
