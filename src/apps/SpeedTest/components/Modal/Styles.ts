import styled, {keyframes} from 'styled-components';

import {colors, fonts} from 'apps/SpeedTest/styles';
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
  padding: 16px;
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.charcoal};
  color: ${colors.fonts.default};
  display: flex;
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
  justify-content: space-between;
  padding: 8px 16px;
  position: relative;
`;

export const Icon = styled(UIcon)`
  color: ${colors.slateGray};

  &:hover {
    background: ${colors.icon.hoverBackground};
    color: ${colors.icon.hoverColor};
  }
`;

export const Modal = styled.div`
  background: ${colors.gunMetal};
  border: 1px solid ${colors.charcoal};
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
