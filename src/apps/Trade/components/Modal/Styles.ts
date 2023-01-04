import styled, {keyframes} from 'styled-components';

import {fonts} from 'apps/Trade/styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3);
  }
`;

export const Content = styled.div`
  padding: 0 24px 32px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 300;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 16px 24px 0;
  position: relative;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 8px;
  font-family: ${fonts.family.default};
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
