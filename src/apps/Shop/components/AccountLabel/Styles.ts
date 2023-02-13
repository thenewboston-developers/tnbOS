import styled from 'styled-components';

import {colors} from 'apps/Shop/styles';
import UAvatar from 'system/components/Avatar';
import {Status} from 'system/components/Avatar/Styles';

export const Avatar = styled(UAvatar)`
  margin-right: 8px;

  ${Status} {
    border-color: #fff;
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
`;

export const Description = styled.div`
  color: ${colors.fonts.muted};
  font-size: 12px;
`;

export const Name = styled.div`
  color: ${colors.fonts.default};
  font-size: 14px;
  font-weight: 600;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
