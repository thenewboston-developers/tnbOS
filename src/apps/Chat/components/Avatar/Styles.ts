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
  border: 3px solid;
  bottom: -3px;
  height: 15px;
  position: absolute;
  right: -3px;
  width: 15px;
`;
