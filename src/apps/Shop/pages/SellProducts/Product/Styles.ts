import styled from 'styled-components';

import UThumbnail from 'apps/Shop/components/Thumbnail';

export const Actions = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const ActivationStatus = styled.div``;

export const Thumbnail = styled(UThumbnail)`
  &:hover {
    cursor: pointer;
  }
`;
