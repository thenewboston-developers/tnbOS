import styled from 'styled-components';

import Card from 'apps/Trade/components/Card';

export const Container = styled.div``;

export const ContentWrapper = styled.div`
  display: flex;
`;

export const NetworkMenu = styled(Card)`
  height: fit-content;
  margin-right: 24px;
  white-space: nowrap;
  width: fit-content;
`;

export const RightContentContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  height: fit-content;
`;

export const RightEmptyStateContainer = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  height: fit-content;
`;
