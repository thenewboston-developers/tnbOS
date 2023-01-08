import styled from 'styled-components';

import MdiIcon from '@mdi/react';

export const ButtonHelperText = styled.div`
  color: #74788d;
  font-size: 12px;
  margin-top: 12px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 24px;
`;

export const Icon = styled(MdiIcon)`
  color: #f46a6a;
  margin-right: 12px;
`;

export const Heading = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px 16px 0;
`;

export const HeadingText = styled.div`
  color: #f46a6aff;
  font-size: 16px;
  font-weight: 500;
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 24px 16px 16px;
`;

export const Panel = styled.div`
  border-radius: 4px;
  border: 1px solid #f46a6a;
`;

export const PanelBody = styled.div`
  padding: 16px 24px 0;
`;
