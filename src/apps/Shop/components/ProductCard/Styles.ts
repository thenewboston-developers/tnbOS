import styled from 'styled-components';

import UAccountLabel from 'apps/Shop/components/AccountLabel';
import ULine from 'apps/Shop/components/Line';
import UThumbnail from 'apps/Shop/components/Thumbnail';
import {colors} from 'apps/Shop/styles';

export const AccountLabel = styled(UAccountLabel)`
  margin-top: 16px;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  border: 1px solid ${colors.border.default};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  overflow: hidden;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    box-shadow: 0 4px 5px rgb(0 0 0 / 5%);
    cursor: pointer;
  }
`;

export const Description = styled.div`
  color: ${colors.fonts.muted};
  font-size: 12px;
  margin-top: 4px;
`;

export const Line = styled(ULine)`
  margin: 16px 0;
`;

export const Name = styled.div`
  color: ${colors.fonts.default};
  font-size: 20px;
  font-weight: 600;
`;

export const Thumbnail = styled(UThumbnail)`
  border-radius: 0;
`;
