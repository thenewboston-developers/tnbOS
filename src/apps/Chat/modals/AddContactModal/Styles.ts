import styled from 'styled-components';

import UModal from 'system/components/Modal';

export const Logo = styled.img`
  height: 24px;
  margin-right: 8px;
  width: 24px;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 480px;
  max-width: 500px;
`;

export const Name = styled.div`
  font-size: 13px;
`;

export const RadioCard = styled.div<{isActive: boolean}>`
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

export const RadioCardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 24px;
`;
