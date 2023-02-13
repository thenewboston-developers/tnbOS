import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(6, 1fr);
  padding: 24px 32px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;
