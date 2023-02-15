import styled from 'styled-components';

const BUBBLE_SIZE = 24;
const TEXT_MARGIN_LEFT = 12;
export const TOTAL_LEFT_SPACING = BUBBLE_SIZE + TEXT_MARGIN_LEFT;

export const Bubble = styled.div`
  align-items: center;
  background-color: #34c38f;
  border-radius: 50%;
  border: 2px solid #34c38f;
  display: flex;
  height: ${`${BUBBLE_SIZE}px`};
  justify-content: center;
  width: ${`${BUBBLE_SIZE}px`};
`;

export const BubbleNumber = styled.div`
  color: #fff;
  font-size: 11px;
  font-weight: 500;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 24px 0 4px;
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-left: ${`${TEXT_MARGIN_LEFT}px`};
`;
