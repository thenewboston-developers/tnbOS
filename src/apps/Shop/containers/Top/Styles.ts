import styled from 'styled-components';

export const Container = styled.div`
  background: #101827;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
`;

export const Left = styled.div`
  align-items: center;
  display: flex;
`;

export const Logo = styled.img`
  height: 26px;

  &:hover {
    cursor: pointer;
  }
`;

export const Right = styled.div`
  display: flex;
`;
