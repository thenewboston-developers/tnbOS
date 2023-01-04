import styled from 'styled-components';

export const Container = styled.div<{isActive: boolean}>`
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${({isActive}) => (isActive ? '#556ee6' : '#f6f6f6')};
  display: flex;
  flex: auto;
  justify-content: center;
  margin: 6px;
  padding: 16px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 24px;
  margin-right: 8px;
  width: 24px;
`;

export const Name = styled.div`
  font-size: 13px;
`;
