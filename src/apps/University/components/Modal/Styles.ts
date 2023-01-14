import styled, {keyframes} from 'styled-components';

import {colors} from 'apps/University/styles';
import UIcon from 'system/components/Icon';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.75);
  }
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  align-items: center;
  color: ${colors.fonts.heading};
  display: flex;
  font-size: 16px;
  font-weight: 500;
  justify-content: space-between;
  padding: 12px 24px;
  position: relative;
`;

export const Icon = styled(UIcon)`
  &:hover {
    cursor: pointer;
  }
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 4px;
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
