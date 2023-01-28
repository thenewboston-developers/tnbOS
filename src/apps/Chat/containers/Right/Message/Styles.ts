import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import {colors, fonts} from 'apps/Chat/styles';
import Icon from 'system/components/Icon';

export const Container = styled.div<{self: boolean}>`
  display: flex;
  padding: 8px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }

  justify-content: ${({self}) => (self ? 'end' : 'start')};
  flex-direction: ${({self}) => (self ? 'row-reverse' : 'row')};
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
  color: ${fonts.weight.light};
  font-size: 13px;
  font-style: italic;
  margin-top: 2px;
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: ${fonts.weight.light};
  margin-right: 4px;
`;

export const DisplayName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
  margin-right: 8px;
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

export const ModifiedDetails = styled.div`
  color: ${fonts.color.light};
  font-size: 10px;
  font-style: italic;
  font-weight: ${fonts.weight.light};
`;

export const Right = styled.div<{self: boolean}>`
  margin-left: 10px;
  background-color: ${({self}) => (self ? '#985eff' : '#121212')};
  padding: 0.5rem;
  border-radius: 10px;
  position: relative;
`;

export const Tool = styled(Icon)`
  background: ${colors.rightBackground};
  border-radius: unset;
  color: ${colors.iconGray};
  padding: 4px;

  &:hover {
    background: #40444a;
    color: ${fonts.color.default};
    cursor: pointer;
  }
`;

export const Tools = styled.div<{$display: boolean}>`
  align-items: center;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  display: ${(props) => (props.$display ? 'flex' : 'none')};
  margin-right: 12px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: -26px;

  &:hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
  }
`;

export const ToolsContainer = styled.div`
  position: relative;
`;
