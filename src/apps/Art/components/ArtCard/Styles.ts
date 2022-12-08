import styled from 'styled-components';

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
`;

export const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.25s ease-in-out 0s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transform: translateY(-1.5px);
  }
`;

export const Img = styled.img`
  height: auto;
  width: 100%;
`;

export const Name = styled.div`
  color: #444;
  font-size: 18px;
  font-weight: 500;
`;
