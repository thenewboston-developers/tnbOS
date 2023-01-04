import styled from 'styled-components';

import {FormBody as UFormBody} from 'apps/Trade/components/FormElements';
import UModal from 'apps/Trade/components/Modal';
import {Header} from 'apps/Trade/components/Modal/Styles';

export const AssetLogoContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid #eff2f7;
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const FormBody = styled(UFormBody)`
  flex-direction: row;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;

  ${Header} {
    margin-bottom: 4px;
  }
`;

export const SectionDivider = styled.div`
  background-color: #eff2f7;
  margin: 24px;
  width: 1px;
`;

export const SectionHeading = styled.div`
  font-weight: 600;
  margin: 24px 0;
  text-align: center;
`;
