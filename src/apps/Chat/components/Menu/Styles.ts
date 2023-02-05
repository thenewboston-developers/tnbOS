import styled from 'styled-components';

import {fonts} from 'apps/Chat/styles';

export const Container = styled.div`
  background: #18191c;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  font-family: ${fonts.family.default};
  min-width: 200px;
  padding: 8px;
  position: fixed;
`;
