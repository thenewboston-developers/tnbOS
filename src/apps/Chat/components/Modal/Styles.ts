import styled, {keyframes} from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';
import UIcon from 'system/components/Icon';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.75); // Primary color
  }
`;

export const Content = styled.div``;

export const Header = styled.div`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: space-between;
  padding: 8px 16px;
  position: relative;
`;

export const Icon = styled(UIcon)`
  &:hover {
    background: ${colors.hoverLight};
  }
`;

export const Modal = styled.div`
  background: ${colors.rightBackground};
  border: 1px solid #303136;
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
