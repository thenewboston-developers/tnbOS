import styled from 'styled-components';

import {fonts} from 'apps/Chat/styles';

export const IMG_HEIGHT = 36;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  width: auto;

  &:active {
    height: ${`${IMG_HEIGHT - 1}px`};
  }

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
  margin-right: 12px;
  width: ${`${IMG_HEIGHT}px`};
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
