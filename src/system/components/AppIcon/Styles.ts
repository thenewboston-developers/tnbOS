import styled from 'styled-components';

import UToolbarItem from 'system/components/ToolbarItem';

export const ToolbarItem = styled(UToolbarItem)<{isActiveApp: boolean}>`
  ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};

  &:hover {
    ${({isActiveApp}) => isActiveApp && `background: rgba(0, 0, 0, 0.06);`};
  }
`;
