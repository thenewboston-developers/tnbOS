import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Actions = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const CreatedDate = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 13px;
`;

export const Description = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const Details = styled.div`
  padding: 0 8px;
`;

export const Name = styled.div`
  color: ${colors.fonts.heading};
  font-weight: 600;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const PublicationStatus = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
`;

export const Thumbnail = styled.img`
  border-radius: 4px;
  height: auto;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;
