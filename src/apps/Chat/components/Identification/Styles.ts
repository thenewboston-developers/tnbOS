import styled from 'styled-components';

import {fonts} from 'apps/Chat/styles';

export const BottomText = styled.div`
  color: ${fonts.color.light};
  font-size: 12px;
`;

export const Container = styled.div`
  display: flex;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 36px;
  margin-right: 10px;
  width: 36px;
`;

export const Text = styled.div``;

export const TopText = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;
