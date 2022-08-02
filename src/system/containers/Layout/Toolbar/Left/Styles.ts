import styled from 'styled-components';

import UToolbarItemContainer from 'system/components/ToolbarItemContainer';

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const ToolbarItemContainer = styled(UToolbarItemContainer)<{isActiveApp: boolean}>`
  ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};

  &:hover {
    ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};
  }
`;
