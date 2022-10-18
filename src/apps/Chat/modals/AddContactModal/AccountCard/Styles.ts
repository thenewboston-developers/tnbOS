import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import {colors, fonts} from 'apps/Chat/styles';

export const AccountNumber = styled.div`
  color: ${fonts.color.light};
  font-size: 12px;
`;

export const Container = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  padding: 8px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const DisplayName = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const TextContainer = styled.div`
  color: ${fonts.color.default};
  flex: 1;
  margin-left: 10px;
`;
