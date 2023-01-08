import styled from 'styled-components';

const CONTAINER_HEIGHT = 20;
const CONTAINER_WIDTH = 36;
const TOGGLE_SIZE = CONTAINER_HEIGHT - 4;
const TOGGLED_LEFT = CONTAINER_WIDTH - TOGGLE_SIZE - 2;

export const Container = styled.div<{checked: boolean}>`
  align-items: center;
  background: ${({checked}) => (checked ? '#34c38f' : 'white')};
  border: 1px solid ${({checked}) => (checked ? '#34c38f' : 'rgba(0, 0, 0, 0.25)')};
  border-radius: ${`${CONTAINER_HEIGHT}px`};
  box-sizing: content-box;
  cursor: pointer;
  display: flex;
  height: ${`${CONTAINER_HEIGHT}px`};
  position: relative;
  width: ${`${CONTAINER_WIDTH}px`};
`;

export const Inner = styled.div<{checked: boolean}>`
  background: ${({checked}) => (checked ? 'white' : '#bfbfbf')};
  border-radius: 100%;
  height: ${`${TOGGLE_SIZE}px`};
  left: ${({checked}) => (checked ? `${TOGGLED_LEFT}px` : '2px')};
  position: absolute;
  transition: left 0.08s linear;
  width: ${`${TOGGLE_SIZE}px`};
`;
