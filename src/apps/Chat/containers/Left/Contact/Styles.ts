import styled, {css} from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';

export const BottomText = styled.div`
  font-size: 12px;
`;

export const Container = styled.div<{isActiveChat: boolean}>`
  border-radius: 6px;
  display: flex;
  margin: 0 12px 2px;
  padding: 6px 8px;

  ${({isActiveChat}) =>
    isActiveChat &&
    css`
      background: #42464d;
      color: white;
    `}

  ${Status} {
    border-color: #2e3136;
    ${({isActiveChat}) => isActiveChat && `border-color: #42464d;`};
  }

  &:hover {
    background: #3b3f44;
    color: #dcddde;
    cursor: pointer;

    ${Status} {
      border-color: #3b3f44;
      ${({isActiveChat}) => isActiveChat && `border-color: #42464d;`};
    }
  }
`;

export const Date = styled.div`
  font-size: 10px;
  font-weight: 300;
`;

export const DisplayName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const Right = styled.div`
  flex: auto;
  margin-left: 10px;
`;

export const TopText = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1px;
`;
