import styled from 'styled-components';

import Icon from 'renderer/components/Icon';
import {colors} from 'renderer/styles';

export const Container = styled.div`
  display: flex;
  padding: 8px 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;

export const Content = styled.div`
  font-size: 14px;
  margin-top: 6px;
`;

export const ContentDeleted = styled.div`
  color: ${colors.palette.gray['300']};
  font-size: 13px;
  font-style: italic;
  margin-top: 6px;
`;

export const Date = styled.div`
  color: ${colors.palette.gray['400']};
  font-size: 10px;
  font-weight: 300;
  margin-right: 4px;
`;

export const DisplayName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
`;

export const Edited = styled.div`
  color: ${colors.palette.gray['400']};
  font-size: 10px;
  font-style: italic;
  font-weight: 300;
`;

export const Header = styled.div`
  display: flex;
`;

export const HeaderLeft = styled.div`
  align-items: baseline;
  display: flex;
  flex: auto;
`;

export const HeaderRight = styled.div`
  align-items: center;
  display: flex;
`;

export const Right = styled.div`
  flex: auto;
  margin-left: 10px;
`;

export const Tool = styled(Icon)`
  background: ${colors.palette.gray['400']};
  border-radius: unset;
  color: white;
  padding: 4px;

  &:hover {
    background: ${colors.palette.gray['500']};
    cursor: pointer;
  }
`;

export const Tools = styled.div<{$display: boolean}>`
  align-items: center;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgb(0 0 0 / 20%);
  display: ${(props) => (props.$display ? 'flex' : 'none')};
  margin-right: 12px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: -26px;
`;

export const ToolsContainer = styled.div`
  position: relative;
`;
