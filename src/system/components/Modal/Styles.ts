import styled, {keyframes} from 'styled-components';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3); // Primary color
  }
`;

export const Content = styled.div`
  padding: ${({theme}) => theme.padding};
`;

export const Header = styled.div`
  align-items: center;
  color: ${({theme}) => theme.header.color};
  display: flex;
  font-size: ${({theme}) => `${theme.header.fontSize}px`};
  font-weight: ${({theme}) => theme.header.fontWeight};
  justify-content: space-between;
  margin-bottom: ${({theme}) => `${theme.header.marginBottom}px`};
  padding: ${({theme}) => theme.header.padding};
  position: relative;
`;

export const Modal = styled.div`
  background: ${({theme}) => theme.backgroundColor};
  border: ${({theme}) => theme.border};
  border-radius: ${({theme}) => `${theme.borderRadius}px`};
  font-family: ${({theme}) => theme.fontFamily};
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Overlay = styled.div`
  animation: ${addOverlay} 0.3s forwards;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;
