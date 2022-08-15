import {Form as UForm} from 'formik';
import styled from 'styled-components';

import {Status} from 'apps/Chat/components/Avatar/Styles';
import UButton from 'apps/Chat/components/Button';
import {InlineInput} from 'apps/Chat/components/FormElements';
import {colors, fonts} from 'apps/Chat/styles';

export const BottomMessage = styled.div`
  height: 8px;
`;

export const Button = styled(UButton)`
  display: none;
`;

export const Container = styled.div`
  background: ${colors.rightBackground};
  color: ${fonts.color.light};
  display: flex;
  flex-direction: column;
`;

export const ContentInput = styled(InlineInput)`
  flex: 1;
`;

export const EmptyState = styled.div`
  align-items: center;
  background: ${colors.rightBackground};
  display: flex;
  justify-content: center;
`;

export const Form = styled(UForm)`
  align-items: center;
  display: flex;
  padding: 0 16px 16px;
`;

export const Messages = styled.div`
  flex: auto;
  overflow-y: auto;
`;

export const OverviewMessageContainer = styled.div`
  align-items: center;
  box-shadow: 0 1px 2px rgb(0, 0, 0, 0.16);
  display: flex;
  padding: 12px 16px;

  ${Status} {
    border-color: ${colors.rightBackground};
  }
`;

export const OverviewMessageContainerRight = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  margin-left: 10px;
`;
