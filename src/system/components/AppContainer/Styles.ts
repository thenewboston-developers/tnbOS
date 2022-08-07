import styled from 'styled-components';

import {colors} from 'system/styles';

export const Container = styled.div`
  background: ${colors.palette.neutral['050']};
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%);
  overflow: hidden;
`;
