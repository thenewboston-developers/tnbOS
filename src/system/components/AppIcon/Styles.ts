import styled from 'styled-components';

import UToolbarItem from 'system/components/ToolbarItem';
import {colors} from 'system/styles';

export const NotificationCount = styled.div`
  align-items: center;
  background: ${colors.red};
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  height: 16px;
  justify-content: center;
  position: absolute;
  right: 4px;
  top: 4px;
  width: 16px;
`;

export const ToolbarItem = styled(UToolbarItem)<{isActiveApp: boolean}>`
  ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};

  &:hover {
    ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};
  }
`;
