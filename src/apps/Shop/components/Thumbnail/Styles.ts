import styled from 'styled-components';

export const Container = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

export const Img = styled.img`
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;
