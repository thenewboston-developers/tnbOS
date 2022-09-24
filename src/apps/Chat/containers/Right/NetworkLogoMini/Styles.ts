import styled, {css} from 'styled-components';

import {colors} from 'apps/Chat/styles';
import {OnlineStatus} from 'system/types';

const offlineMixin = css`
  border: 1px solid ${colors.palette.gray['300']};
  opacity: 0.4;
`;

const onlineMixin = css`
  border: 1px solid ${colors.palette.green['300']};
`;

export const Img = styled.img<{onlineStatus: OnlineStatus; right: number}>`
  border-radius: 50%;
  height: 24px;
  position: absolute;
  right: ${(props) => `${props.right}px`};
  width: 24px;

  ${({onlineStatus}) => onlineStatus === OnlineStatus.online && onlineMixin};
  ${({onlineStatus}) => onlineStatus === OnlineStatus.offline && offlineMixin};
`;
