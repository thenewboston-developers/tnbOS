import styled from 'styled-components';

export const Container = styled.div<{isActive: boolean}>`
  background: ${({isActive}) => (isActive ? '#ff9603' : '#fff')};
  border-radius: 2px;
  height: 4px;
  margin: 8px 0;
`;
