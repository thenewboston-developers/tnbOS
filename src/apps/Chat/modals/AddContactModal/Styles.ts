import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import UModal from 'apps/Chat/components/Modal';
import {colors, fonts, scrollStyle} from 'apps/Chat/styles';

export const AccountCard = styled.div`
  align-items: center;
  border-radius: 3px;
  display: flex;
  padding: 8px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const AccountCardContainer = styled.div`
  max-height: 320px;
  overflow-y: scroll;
  ${scrollStyle};
`;

export const AccountCardText = styled.div`
  color: ${fonts.color.default};
  flex: 1;
  margin-left: 10px;
`;

export const AccountNumber = styled.div`
  color: ${fonts.color.light};
  font-size: 12px;
`;

export const DisplayName = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  min-width: 380px;
  max-width: 400px;
`;
