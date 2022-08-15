import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import {colors, fonts} from 'apps/Chat/styles';
import Icon from 'system/components/Icon';

export const Container = styled.div`
  display: flex;
  padding: 8px 12px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }

  &:hover {
    background: ${colors.hoverDark};

    ${Status} {
      border-color: ${colors.hoverDark};
    }
  }
`;

export const Content = styled.div`
  color: ${fonts.color.default};
  font-size: 14px;
  margin-top: 1px;
`;

export const ContentDeleted = styled.div`
  color: grey;
  font-size: 13px;
  font-style: italic;
  margin-top: 6px;
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: ${fonts.weight.light};
  margin-right: 4px;
`;

export const DisplayName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  margin-right: 8px;
`;

export const Edited = styled.div`
  color: grey;
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
  background: grey;
  border-radius: unset;
  color: white;
  padding: 4px;

  &:hover {
    background: grey;
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
