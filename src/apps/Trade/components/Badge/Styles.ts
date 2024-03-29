import styled, {css} from 'styled-components';

import {colors} from 'apps/Trade/styles';
import {BadgeStyle} from '.';

const dangerMixin = css`
  background-color: ${colors.palette.red['300']};
`;

const darkLightMixin = css`
  background-color: rgba(52, 58, 64, 0.18);
  color: ${colors.palette.onyx['300']};
`;

const darkMixin = css`
  background-color: ${colors.palette.slateGray['300']};
`;

const infoMixin = css`
  background-color: ${colors.palette.lightBlue['300']};
`;

const primaryMixin = css`
  background-color: ${colors.palette.royalBlue['300']};
`;

const successMixin = css`
  background-color: ${colors.palette.green['300']};
`;

const warningMixin = css`
  background-color: ${colors.palette.yellow['300']};
`;

export const Container = styled.div<{badgeStyle: BadgeStyle}>`
  border-radius: 4px;
  color: #fff;
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
