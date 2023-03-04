import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

const BUBBLE_SIZE = 32;
const TEXT_MARGIN_LEFT = 12;
export const TOTAL_LEFT_SPACING = BUBBLE_SIZE + TEXT_MARGIN_LEFT;

export const Bubble = styled.div`
  align-items: center;
  background-color: ${colors.palette.green['300']};
  border-radius: 50%;
  border: 2px solid ${colors.palette.green['300']};
  display: flex;
  height: ${`${BUBBLE_SIZE}px`};
  justify-content: center;
  width: ${`${BUBBLE_SIZE}px`};
`;

export const BubbleNumber = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  color: ${colors.palette.onyx['300']};
  font-size: 16px;
  font-weight: 600;
  margin-left: ${`${TEXT_MARGIN_LEFT}px`};
`;
