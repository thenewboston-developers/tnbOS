import styled from 'styled-components';

import Card from 'apps/Trade/components/Card';
import UError from 'apps/Trade/components/Error';

export const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;

export const BottomSections = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Container = styled(Card)`
  margin-bottom: 24px;
  padding-bottom: 32px;
`;

export const Error = styled(UError)`
  margin-top: 20px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 12px;
  margin-left: 6px;
  width: 12px;
`;

export const Section = styled.div`
  min-width: 40%;
`;

export const SectionHeading = styled.div`
  font-weight: 600;
  margin: 20px 0 12px 0;
  text-align: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Top = styled.div`
  align-items: center;
  border-bottom: 1px solid #eff2f7;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const TopTools = styled.div`
  align-items: center;
  display: flex;
`;
