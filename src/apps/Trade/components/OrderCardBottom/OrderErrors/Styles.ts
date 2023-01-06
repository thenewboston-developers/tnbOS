import styled from 'styled-components';

import UError from 'apps/Trade/components/Error';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Error = styled(UError)`
  margin-top: 12px;
`;
