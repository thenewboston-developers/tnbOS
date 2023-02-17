import styled from 'styled-components';

export const Container = styled.div`
  align-self: flex-start;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const Img = styled.img`
  height: auto;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
`;
