import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const Container = styled.div`
  padding: 24px;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Tab = styled.div<{isActive?: boolean}>`
  background: ${({isActive}) => (isActive ? '#556ee6' : 'transparent')};
  border-radius: 4px;
  color: ${({isActive}) => (isActive ? 'white' : '#495057')};
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    color: ${({isActive}) => (isActive ? 'white' : '#4458b8')};
    cursor: pointer;
  }
`;

export const TransferGrid = styled.div`
  column-gap: 32px;
  display: grid;
  grid-template-columns: 2.6fr 1fr 1fr 1fr;
  margin-top: 24px;
  row-gap: 24px;
`;