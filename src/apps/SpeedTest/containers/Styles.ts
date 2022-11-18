import styled from 'styled-components';

import {fonts, scrollStyle} from 'apps/SpeedTest/styles';

export const Container = styled.div`
  align-items: center;
  background: #222736;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%);
  color: #a6b0cf;
  display: flex;
  flex-direction: column;
  font-family: ${fonts.family.default};
  font-weight: ${fonts.weight.regular};
  justify-content: flex-start;
  max-height: 80%;
  overflow-y: auto;
  padding: 24px;
  width: 60%;

  ${scrollStyle};
`;
