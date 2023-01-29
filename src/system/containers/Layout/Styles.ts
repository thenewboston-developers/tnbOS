import styled from 'styled-components';

import UMainArea from 'system/containers/Layout/MainArea';
import UToolbar from 'system/containers/Layout/Toolbar';
import {constants} from 'system/styles';

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto ${constants.toolbarHeight};
  height: 100vh;
  overflow: hidden;
`;

export const MainArea = styled(UMainArea)`
  display: flex;
  grid-row: 1 / span 1;

  > div {
    bottom: ${constants.toolbarHeight};
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

export const Toolbar = styled(UToolbar)`
  grid-row: 2 / span 1;
`;
