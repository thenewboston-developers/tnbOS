import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: fit-content;
  position: relative;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 36px;
  width: 36px;
`;

export const OnlineIndicatorOuter = styled.div`
  bottom: -2px;
  display: flex;
  position: absolute;
  right: -2px;
`;

export const OnlineIndicatorInner = styled.div`
  bottom: 0;
  display: flex;
  position: absolute;
  right: 0;
`;
