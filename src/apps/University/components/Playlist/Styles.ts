import styled from 'styled-components';

import USectionHeading from 'apps/University/components/SectionHeading';
import {colors} from 'apps/University/styles';

export const Container = styled.div``;

export const Empty = styled.div`
  color: ${colors.fonts.secondary};
  font-size: 12px;
  font-style: italic;
  padding: 16px;
  text-align: center;
`;

export const Lectures = styled.div``;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 8px;
`;
