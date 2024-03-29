import styled, {css} from 'styled-components';

import {BadgeStyle} from '.';

const dangerMixin = css`
  background-color: #f46a6a;
`;

const darkLightMixin = css`
  background-color: rgba(52, 58, 64, 0.18);
  color: #343a40;
`;

const darkMixin = css`
  background-color: #74788d;
`;

const infoMixin = css`
  background-color: #50a5f1;
`;

const primaryMixin = css`
  background-color: #556ee6;
`;

const successMixin = css`
  background-color: #34c38f;
`;

const warningMixin = css`
  background-color: #f1b44c;
`;

export const Container = styled.div<{badgeStyle: BadgeStyle}>`
  border-radius: 4px;
  color: white;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({badgeStyle}) => {
    if (badgeStyle === BadgeStyle.danger) return dangerMixin;
    if (badgeStyle === BadgeStyle.dark) return darkMixin;
    if (badgeStyle === BadgeStyle.darkLight) return darkLightMixin;
    if (badgeStyle === BadgeStyle.info) return infoMixin;
    if (badgeStyle === BadgeStyle.primary) return primaryMixin;
    if (badgeStyle === BadgeStyle.success) return successMixin;
    if (badgeStyle === BadgeStyle.warning) return warningMixin;
    return;
  }}
`;
