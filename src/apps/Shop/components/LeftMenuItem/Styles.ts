import styled, {css} from 'styled-components';
import MdiIcon from '@mdi/react';

const transitionMixin = css`
  transition: all 0.1s;
`;

export const Icon = styled(MdiIcon)<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#ced1d4')};
  ${transitionMixin};
`;

export const Text = styled.div<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#ced1d4')};
  font-size: 13px;
  font-weight: 500;
  margin-left: 12px;
  ${transitionMixin};
`;

export const Container = styled.div<{$isActivePage: boolean}>`
  align-items: center;
  background: ${({$isActivePage}) => ($isActivePage ? '#2d3344' : 'transparent')};
  border-radius: 6px;
  display: flex;
  margin: 0 12px 4px;
  padding: 10px;
  width: 226px;
  ${transitionMixin};

  &:hover {
    background: #2d3344;
    cursor: pointer;

    ${Icon}, ${Text} {
      color: #fff;
    }
  }
`;
