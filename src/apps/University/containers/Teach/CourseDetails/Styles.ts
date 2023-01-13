import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  height: 100%;
  overflow-y: hidden;
`;

export const LeftMenu = styled.div`
  background: #2a3042;
  color: #79829c;
  display: flex;
  flex-direction: column;
  flex: auto;
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
