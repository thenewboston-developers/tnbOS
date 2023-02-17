import styled from 'styled-components';

import UInstructor from 'apps/University/components/Instructor';
import UThumbnail from 'apps/University/components/Thumbnail';
import {colors} from 'apps/University/styles';

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 12px 16px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-shadow: 0 3px 1px rgb(0 0 0 / 4%);
  display: flex;
  flex-direction: column;
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

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Instructor = styled(UInstructor)`
  margin-top: 16px;
`;

export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-size: 20px;
  font-weight: 600;
`;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 0;
`;
