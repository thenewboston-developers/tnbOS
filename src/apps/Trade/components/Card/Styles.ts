import styled from 'styled-components';

export const Card = styled.div<{padding?: number}>`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 12px 24px rgb(18 38 63 / 3%);
  padding: ${({padding}) => (Number.isInteger(padding) ? `${padding}px` : '20px')};
`;

export const Title = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 24px;
`;
