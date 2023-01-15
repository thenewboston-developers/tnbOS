import styled, {css} from 'styled-components';
import MdiIcon from '@mdi/react';

const transitionMixin = css`
  transition: all 0.1s;
`;

export const Icon = styled(MdiIcon)<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#aaabae')};
  ${transitionMixin};
`;

export const Text = styled.div<{$isActivePage: boolean; $isCollapsed: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#aaabae')};
  display: ${({$isCollapsed}) => ($isCollapsed ? 'none' : 'block')};
  font-size: 13px;
  margin-left: 12px;
  ${transitionMixin};
`;

export const Container = styled.div<{$isActivePage: boolean; $isCollapsed: boolean}>`
  align-items: center;
  background: ${({$isActivePage}) => ($isActivePage ? '#2b303a' : 'transparent')};
  display: flex;
  padding: 10px 24px;
  width: ${({$isCollapsed}) => ($isCollapsed ? 'auto' : '250px')};
  ${transitionMixin};

  &:hover {
    background: #2b303a;
    cursor: pointer;

    ${Icon}, ${Text} {
      color: #fff;
    }
  }
`;
