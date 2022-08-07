import styled from 'styled-components';

import {colors} from 'system/styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const H3 = styled.h3`
  font-weight: 600;
  margin-top: 32px;
`;

export const HelperText = styled.div`
  font-size: 12px;
  margin-top: 8px;
`;

export const Img = styled.img`
  width: 72px;
`;

export const SpanBlue = styled.span`
  color: ${colors.palette.blue['500']};
  cursor: pointer;
  font-weight: 600;
`;

export const SpanGray = styled.span`
  color: ${colors.palette.gray['500']};
`;
