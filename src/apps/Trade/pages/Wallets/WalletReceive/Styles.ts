import styled from 'styled-components';

import Card from 'apps/Trade/components/Card';
import UQrCopy from 'system/components/QrCopy';

export const Container = styled(Card)`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const QrCopy = styled(UQrCopy)`
  margin-top: 24px;
`;
