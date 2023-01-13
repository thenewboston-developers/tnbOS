import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;
  display: flex;
  font-size: 12px;
  padding: 4px 8px 4px 0;
  transition: all 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`;

export const Description = styled.div`
  margin-top: 2px;
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

export const Position = styled.div`
  align-items: center;
  color: grey;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 0 8px;
  width: 24px;
`;

export const Thumbnail = styled.img`
  align-self: flex-start;
  flex-shrink: 0;
  height: auto;
  width: 100px;
`;
