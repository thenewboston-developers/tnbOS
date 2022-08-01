import styled from 'styled-components';
import {mdiAlertCircleOutline, mdiCheckCircle} from '@mdi/js';

import Icon from 'system/components/Icon';
import {colors} from 'system/styles';
import {ToastType} from 'types';

export const Container = styled.div<{type: ToastType}>`
  background-color: ${({type}) => {
    if (type === ToastType.success) {
      return colors.green['400'];
    }
    if (type === ToastType.warning) {
      return colors.yellow['400'];
    }
    return colors.red['400'];
  }};
  display: flex;
  padding: 12px;
`;

export const Text = styled.span`
  align-items: center;
  color: #fff;
  display: flex;
`;

const iconProps = `
  color: #fff;
  margin-right: 12px;
`;

export const AlertCircleOutlineIcon = styled(Icon).attrs(() => ({icon: mdiAlertCircleOutline}))`
  ${iconProps}
`;

export const CheckCircleIcon = styled(Icon).attrs(() => ({icon: mdiCheckCircle}))`
  ${iconProps}
`;
