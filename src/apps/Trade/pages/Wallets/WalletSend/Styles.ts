import {Form as UForm} from 'formik';
import styled from 'styled-components';

import UButton from 'apps/Trade/components/Button';
import Card from 'apps/Trade/components/Card';

export const Button = styled(UButton)`
  align-self: end;
`;

export const Container = styled(Card)``;

export const Form = styled(UForm)`
  display: flex;
  flex-direction: column;
  width: 220px;
`;
