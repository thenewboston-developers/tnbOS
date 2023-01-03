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

export const Status = styled.div<{indicatorColor: string}>`
  background-color: ${({indicatorColor}) => indicatorColor};
  border-radius: 50%;
  border: 2px solid;
  bottom: -2px;
  height: 14px;
  position: absolute;
  right: -2px;
  width: 14px;
`;
