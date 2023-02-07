import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import UTools from 'apps/Chat/components/Tools';
import {colors, fonts} from 'apps/Chat/styles';
import {colors as systemColors} from 'system/styles';

export const AttachmentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

export const Container = styled.div`
  display: flex;
  padding: 8px 16px;

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

export const NotificationLine = styled.hr`
  border: 0;
  border-top: 0.5px solid ${systemColors.red};
  margin: 4px 16px;
`;

export const Right = styled.div`
  flex: auto;
  margin-left: 10px;
`;

export const Tools = styled(UTools)`
  margin-right: 12px;
  top: -26px;
`;

export const ToolsContainer = styled.div`
  position: relative;
`;
