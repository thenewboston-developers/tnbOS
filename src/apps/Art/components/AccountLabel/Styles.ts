import styled from 'styled-components';

import UAvatar from 'system/components/Avatar';
import {Status} from 'system/components/Avatar/Styles';

export const Avatar = styled(UAvatar)`
  margin-right: 10px;

  ${Status} {
    border-color: #fff;
  }
`;

export const BottomText = styled.div`
  font-size: 12px;
  margin-top: 1px;
`;

export const Container = styled.div`
  display: flex;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 36px;
  margin-right: 10px;
  width: 36px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TopText = styled.div`
  font-size: 12px;
  font-weight: 600;
`;
