import styled from 'styled-components';

import {colors, fonts} from 'apps/Chat/styles';
import ULeft from './Left';
import URight from './Right';

export const Container = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 3%);
  display: grid;
  font-family: ${fonts.family.default};
  grid-template-columns: 240px auto;
  height: 80%;
  overflow: hidden;
  width: 90%;

  * {
    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${colors.dark};
      border-radius: 2px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }
  }
`;

export const Left = styled(ULeft)`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Right = styled(URight)`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
