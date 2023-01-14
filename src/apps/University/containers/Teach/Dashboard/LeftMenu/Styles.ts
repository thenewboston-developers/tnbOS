import styled from 'styled-components';

export const Container = styled.div`
  background: #2a3042;
  color: #79829c;
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Menu = styled.div`
  margin-top: 16px;
`;

export const MenuOption = styled.div<{isActive: boolean}>`
  color: ${({isActive}) => (isActive ? '#fff' : '#79829c')};

  &:hover {
    color: ${({isActive}) => (isActive ? '#fff' : '#79829c')};
    cursor: pointer;
  }
`;

export const Name = styled.div`
  font-weight: 400;
`;

export const NameLabel = styled.div`
  font-weight: 600;
  margin-top: 12px;
`;

export const Thumbnail = styled.img`
  height: auto;
  width: 100%;
`;
