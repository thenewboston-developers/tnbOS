import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
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

export const EmptyState = styled.div`
  align-items: center;
  background: ${colors.rightBackground};
  display: flex;
  justify-content: center;
`;

export const Messages = styled.div`
  border-bottom: 1px solid red;
  flex: auto;
  overflow-y: auto;
`;

export const OverviewMessageContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid green;
  display: flex;
  padding: 12px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const OverviewMessageContainerRight = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;
