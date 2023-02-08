import styled from 'styled-components';

export const Container = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  align-self: flex-start;
  flex-shrink: 0;
  height: auto;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
`;
