import styled from 'styled-components';

const BUBBLE_SIZE = 24;
const TEXT_MARGIN_LEFT = 8;
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
  margin: 16px 0 4px;
`;

export const Text = styled.div`
  color: #343a40;
  font-size: 13px;
  font-weight: 700;
  margin-left: ${`${TEXT_MARGIN_LEFT}px`};
`;
