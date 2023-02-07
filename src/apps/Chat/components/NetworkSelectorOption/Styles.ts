import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors, fonts} from 'apps/Chat/styles';

export const Balance = styled.div`
  font-size: 12px;
`;

export const Container = styled.div`
  align-items: center;
  border-radius: 4px;
  color: ${fonts.color.light};
  display: flex;
  padding: 6px;
  transition: background 0.1s;
  white-space: nowrap;

  &:hover {
    background: ${colors.hoverMedium};
    color: ${fonts.color.default};
    cursor: pointer;
  }
`;

export const DisplayName = styled.div`
  font-weight: ${fonts.weight.bold};
`;

export const Icon = styled(UMdiIcon)`
  margin-right: 10px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 26px;
  margin-right: 10px;
  width: auto;
`;

export const Right = styled.div``;
