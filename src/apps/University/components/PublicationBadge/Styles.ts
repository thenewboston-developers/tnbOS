import styled, {css} from 'styled-components';

import {colors} from 'apps/University/styles';
import {PublicationStatus} from 'apps/University/types';

const draftMixin = css`
  background-color: ${colors.palette.black['100']};
`;

const publishedMixin = css`
  background-color: ${colors.palette.green['200']};
`;

export const Container = styled.div<{publicationStatus: PublicationStatus}>`
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({publicationStatus}) => {
    if (publicationStatus === PublicationStatus.draft) return draftMixin;
    if (publicationStatus === PublicationStatus.published) return publishedMixin;
    return;
  }}
`;
