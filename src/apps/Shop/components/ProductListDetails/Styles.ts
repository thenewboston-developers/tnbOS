import styled, {css} from 'styled-components';

import UPriceMini from 'apps/Shop/components/PriceMini';
import {mixinListItemDescription, mixinListItemName} from 'apps/Shop/styles';
import {GenericVoidFunction} from 'shared/types';

const isClickableMixin = css`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  padding: 0 8px;
`;

export const Description = styled.div`
  ${mixinListItemDescription};
`;

export const Name = styled.div<{onClick?: GenericVoidFunction}>`
  ${mixinListItemName};
  ${({onClick}) => !!onClick && isClickableMixin}
`;

export const PriceMini = styled(UPriceMini)`
  margin-top: 10px;
`;
