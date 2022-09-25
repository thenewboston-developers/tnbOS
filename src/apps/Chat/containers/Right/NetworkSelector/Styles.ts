import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors, fonts} from 'apps/Chat/styles';

export const IMG_HEIGHT = 26;

export const Icon = styled(UMdiIcon)`
  color: ${colors.iconGray};

  &:hover {
    color: ${fonts.color.default};
    cursor: pointer;
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  width: ${`${IMG_HEIGHT}px`};

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
    cursor: pointer;
  }
`;

export const ImgContainer = styled.div`
  align-items: center;
  display: flex;
  height: ${`${IMG_HEIGHT}px`};
  justify-content: center;
  margin-left: 12px;
  width: auto;
`;

export const Menu = styled.div`
  background: #18191c;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  font-family: ${fonts.family.default};
  min-width: 200px;
  padding: 8px;
  position: fixed;
`;
