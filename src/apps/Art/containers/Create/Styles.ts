import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const Left = styled.div`
  background: #252627;
  display: flex;
  flex-direction: column;
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
