import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';

export const ActionText = styled.span`
  color: ${colors.palette.blue['200']};
  cursor: pointer;
  font-weight: ${fonts.weight.semiBold};
`;

export const Bottom = styled.div`
  font-size: 12px;
  margin-top: 8px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const H3 = styled.h3`
  color: #fff;
  font-weight: ${fonts.weight.semiBold};
  margin-top: 32px;
`;

export const HelperText = styled.span`
  color: ${fonts.color.default};
`;
