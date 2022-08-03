import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 280px auto;
  height: 60%;
  width: 80%;

  // TODO: Standardize this (copied from Figma)
  background: #fcfdfe;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%);
  overflow: hidden;
`;
