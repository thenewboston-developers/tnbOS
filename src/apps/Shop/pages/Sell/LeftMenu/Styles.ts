import styled from 'styled-components';

import {colors} from 'apps/Shop/styles';

export const Container = styled.div`
  background: #fff;
  border-right: 1px solid ${colors.border.default};
  display: flex;
  flex-direction: column;
  flex: auto;
  overflow: auto;
  padding-top: 16px;
`;
