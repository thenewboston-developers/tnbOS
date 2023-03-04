import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

export const ActiveNetwork = styled.div`
  align-items: center;
  display: flex;
  padding: 12px 16px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`;

export const Amount = styled.div``;

export const Balance = styled.div`
  align-items: center;
  display: flex;
  padding: 12px 16px;
  transition: all 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`;

export const Container = styled.div`
  background: white;
  box-shadow: 0 12px 24px rgb(18 38 63 / 3%);
  color: ${colors.palette.slateGray['300']};
  display: flex;
  font-size: 12px;
  justify-content: space-between;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 12px;
  margin-left: 6px;
  width: 12px;
`;
