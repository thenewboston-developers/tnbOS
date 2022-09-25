import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import {colors, fonts} from 'apps/Chat/styles';

export const Container = styled.div`
  align-items: center;
  box-shadow: 0 1px 2px rgb(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
`;

export const LeftText = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  margin-left: 10px;
`;

export const Right = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;
