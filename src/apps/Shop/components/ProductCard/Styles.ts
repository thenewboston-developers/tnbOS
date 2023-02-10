import styled from 'styled-components';

import UThumbnail from 'apps/Shop/components/Thumbnail';
import {colors} from 'apps/Shop/styles';

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 3px 1px rgb(0 0 0 / 4%);
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
    cursor: pointer;
  }
`;

export const Description = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  margin-top: 4px;
`;

export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-size: 20px;
  font-weight: 600;
`;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 0;
`;
