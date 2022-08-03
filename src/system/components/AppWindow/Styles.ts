import styled from 'styled-components';

export const Container = styled.div<{$display: boolean}>`
  align-items: center;
  display: ${(props) => (props.$display ? 'flex' : 'none')};
  justify-content: center;
`;
