import {mdiCalendarMonth} from '@mdi/js';

import {SFC} from 'system/types';
import {shortDate} from 'system/utils/dates';
import * as S from './Styles';

export interface DateProps {
  date: string;
  label: string;
}

const Date: SFC<DateProps> = ({className, date, label}) => {
  return (
    <S.Container className={className}>
      <S.Icon path={mdiCalendarMonth} size="24px" />
      <S.Right>
        <S.Label>{label}</S.Label>
        <S.Date>{shortDate(date, true)}</S.Date>
      </S.Right>
    </S.Container>
  );
};

export default Date;
