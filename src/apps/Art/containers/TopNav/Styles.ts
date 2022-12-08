import styled from 'styled-components';

export const Container = styled.div`
  background: #000;
  display: flex;
  gap: 12px;
  padding: 12px;
`;

export const MenuItem = styled.span`
  color: white;

  &:hover {
    color: #ccc;
    cursor: pointer;
  }
`;
