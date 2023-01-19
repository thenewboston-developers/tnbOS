import styled, {css} from 'styled-components';
import MdiIcon from '@mdi/react';

const transitionMixin = css`
  transition: all 0.1s;
`;

export const Icon = styled(MdiIcon)`
  color: #aaabae;
  ${transitionMixin};
`;

export const Text = styled.div`
  ${transitionMixin};
  color: #aaabae;
  font-size: 12px;
  font-weight: 600;
  margin-left: 12px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-top: 8px;
  padding: 10px 24px;
  width: 250px;
  ${transitionMixin};

  &:hover {
    background: #2b303a;
    cursor: pointer;

    ${Icon}, ${Text} {
      color: #fff;
    }
  }
`;
