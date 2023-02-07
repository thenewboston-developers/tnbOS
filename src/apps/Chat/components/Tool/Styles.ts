import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';
import Icon from 'system/components/Icon';

export const Container = styled(Icon)`
  background: ${colors.rightBackground};
  border-radius: unset;
  color: ${colors.iconGray};
  padding: 4px;

  &:hover {
    background: #40444a;
    color: ${fonts.color.default};
    cursor: pointer;
  }
`;
