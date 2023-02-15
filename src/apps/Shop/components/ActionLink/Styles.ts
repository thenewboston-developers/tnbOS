import styled from 'styled-components';

import {colors} from 'apps/Shop/styles';

export const Container = styled.div`
  color: ${colors.palette.blue['200']};

  &:hover {
    color: ${colors.palette.blue['300']};
    cursor: pointer;
    text-decoration: underline;
  }
`;
