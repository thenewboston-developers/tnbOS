import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import UTools from 'apps/Chat/components/Tools';
import {colors, fonts} from 'apps/Chat/styles';

export const AlignCenter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px 12px;
`;

export const Center = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 100px;
`;

export const Container = styled.div`
  background: ${colors.leftBackground};
  border: 0.5px solid ${colors.dark};
  border-radius: 4px;
  border-top: none;
  color: ${fonts.color.default};
  display: flex;
  flex-direction: column;
  font-size: 13px;
  min-width: 420px;
  overflow: hidden;
  position: relative;
`;

export const Heading = styled.div`
  color: ${fonts.color.light};
  display: flex;
  font-weight: 600;
  justify-content: center;
  text-decoration: underline;
`;

export const Icon = styled(UMdiIcon)<{$hasDifferences: boolean}>`
  color: ${({$hasDifferences}) => ($hasDifferences ? colors.palette.blue['500'] : colors.palette.green['500'])};

  &:hover {
    color: ${({$hasDifferences}) => ($hasDifferences ? colors.palette.blue['400'] : colors.palette.green['500'])};
    cursor: ${({$hasDifferences}) => ($hasDifferences ? 'pointer' : 'default')};
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 72px;
  margin-top: 16px;
  width: 72px;
`;

export const Label = styled.div`
  color: ${fonts.color.light};
  font-size: 11px;
  margin: 16px 0 4px;
`;

export const Left = styled.div`
  min-width: 120px;
`;

export const Right = styled.div`
  min-width: 120px;
`;

export const Tools = styled(UTools)`
  top: 0;
`;

export const Top = styled.div`
  background: ${colors.dark};
  display: flex;
  font-weight: 600;
  justify-content: center;
  padding: 8px 12px;
`;
