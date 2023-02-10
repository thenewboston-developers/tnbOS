import styled from 'styled-components';

export const Container = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
`;

export const Img = styled.img`
  height: auto;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;
