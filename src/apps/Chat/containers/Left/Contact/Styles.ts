import styled, {css} from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import {colors, fonts} from 'apps/Chat/styles';
import {colors as systemColors} from 'system/styles';

export const BottomText = styled.div`
  font-size: 12px;
`;

export const Container = styled.div<{isActiveChat: boolean}>`
  border-radius: 6px;
  display: flex;
  margin: 0 12px 2px;
  padding: 6px 8px;

  ${Status} {
    border-color: ${colors.leftBackground};
  }

  ${({isActiveChat}) =>
    isActiveChat &&
    css`
      background: ${colors.hoverLight};
      color: #fff;

      ${Status} {
        border-color: ${colors.hoverLight};
      }
    `}

  &:hover {
    background: ${colors.hoverMedium};
    color: ${fonts.color.default};
    cursor: pointer;

    ${Status} {
      border-color: ${colors.hoverMedium};
    }
  }
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: ${fonts.weight.light};
`;

export const DisplayName = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const NotificationCount = styled.div`
  align-items: center;
  background: ${systemColors.red};
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  height: 16px;
  justify-content: center;
  width: 24px;
`;

export const NotificationCountContainer = styled.div`
  align-items: center;
  display: flex;
  margin-left: 10px;
`;

export const Right = styled.div`
  flex: auto;
  margin-left: 10px;
`;

export const TopText = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
`;
