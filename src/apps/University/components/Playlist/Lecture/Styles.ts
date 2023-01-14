import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  border-radius: 4px;
  display: flex;
  font-size: 12px;
  padding: 8px 8px 8px 0;
  transition: all 0.15s;

  &:hover {
    background: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
`;

export const Description = styled.div`
  color: ${colors.fonts.default};
  font-size: 12px;
  margin-top: 2px;
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-size: 13px;
  font-weight: 600;
`;

export const Position = styled.div`
  align-items: center;
  color: ${colors.fonts.secondary};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 0 8px;
  width: 24px;
`;

export const Thumbnail = styled.img`
  align-self: flex-start;
  border-radius: 4px;
  flex-shrink: 0;
  height: auto;
  width: 100px;
`;
