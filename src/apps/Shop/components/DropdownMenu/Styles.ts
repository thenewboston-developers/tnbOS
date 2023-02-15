import styled from 'styled-components';

export const Container = styled.div``;

export const Img = styled.img`
  border-radius: 50%;
  height: 36px;
  width: 36px;

  &:hover {
    cursor: pointer;
  }
`;

export const Menu = styled.div`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  padding: 6px 0;
  position: fixed;
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
  padding: 8px 12px;
  transition: background 0.1s;
  white-space: nowrap;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }
`;
