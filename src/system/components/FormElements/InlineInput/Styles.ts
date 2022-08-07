import {Field as UField} from 'formik';
import styled from 'styled-components';

import {colors} from 'system/styles';

export const Field = styled(UField)`
  background: ${colors.palette.neutral['075']};
  border-radius: 3px;
  border: 1px solid ${({$error}) => ($error ? colors.palette.red['500'] : 'transparent')};
  height: 40px;
  padding: 10px 14px;
  width: ${({width}) => (width ? `${width}px` : '260px')};
`;
