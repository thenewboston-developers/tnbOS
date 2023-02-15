import styled, {css} from 'styled-components';
import MdiIcon from '@mdi/react';

const transitionMixin = css`
  transition: all 0.1s;
`;

export const Icon = styled(MdiIcon)`
  ${transitionMixin};
`;

export const Text = styled.div`
  ${transitionMixin};
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  ${transitionMixin};

  &:hover {
    cursor: pointer;

    ${Icon}, ${Text} {
      color: #000;
    }
  }
`;
