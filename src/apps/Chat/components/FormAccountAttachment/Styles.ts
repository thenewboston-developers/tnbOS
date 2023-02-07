import styled from 'styled-components';

import UTools from 'apps/Chat/components/Tools';

export const Container = styled.div`
  align-items: center;
  background: #2e3136;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  position: relative;
`;

export const Img = styled.img`
  height: 72px;
  width: 72px;
`;

export const Text = styled.div`
  font-size: 12px;
  margin-top: 8px;
`;

export const Tools = styled(UTools)`
  top: 0;
`;
