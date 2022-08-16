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
  flex: auto;
  overflow-y: auto;
`;

export const OverviewMessageContainer = styled.div`
  align-items: center;
  box-shadow: 0 1px 2px rgb(0, 0, 0, 0.16);
  display: flex;
  padding: 12px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const OverviewMessageContainerRight = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  margin-left: 10px;
`;
