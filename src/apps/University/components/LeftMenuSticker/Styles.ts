import styled from 'styled-components';

export const BottomText = styled.div`
  font-weight: 400;
  margin-top: 2px;
`;

export const TextContainer = styled.div`
  font-size: 12px;
  margin-bottom: 24px;
  padding: 8px 20px 0;
`;

export const Thumbnail = styled.img`
  border-radius: 4px;
  height: auto;
  object-fit: cover;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
`;

export const ThumbnailContainer = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  margin: 0 20px;
  overflow: hidden;
`;

export const TopText = styled.div`
  font-weight: 600;
`;
