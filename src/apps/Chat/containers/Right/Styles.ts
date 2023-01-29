import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';

export const BottomMessage = styled.div`
  height: 8px;
`;

export const Container = styled.div`
  background: ${colors.rightBackground};
  color: ${fonts.color.light};
  display: flex;
  flex-direction: column;
`;

export const EmptyStateContainer = styled.div`
  align-items: center;
  background: ${colors.rightBackground};
  display: flex;
  justify-content: center;
`;

export const Messages = styled.div`
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
`;
