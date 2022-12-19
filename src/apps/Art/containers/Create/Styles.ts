import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

export const BackIcon = styled(UMdiIcon)`
  margin-right: 8px;
`;

export const Back = styled.div`
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  font-weight: 400;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const Left = styled.div`
  background: #252627;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 24px;
  width: 260px;
`;

export const PreviewContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 6%);
  max-width: 90%;
  padding: 24px;
`;

export const Right = styled.div`
  align-items: center;
  background: #ebecf0;
  display: flex;
  flex: 1;
  justify-content: center;
  overflow: auto;
`;
