import {SFC} from 'system/types';
import * as S from './Styles';

const History: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Heading>History</S.Heading>
      <S.Table>
        <thead>
          <tr>
            <S.Th>Account</S.Th>
            <S.Th>Network</S.Th>
            <S.Th>Date</S.Th>
            <S.Th>Speed</S.Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <S.Td>bbb7484c7c5f4190...</S.Td>
            <S.Td>TNB</S.Td>
            <S.Td>12/28/1986</S.Td>
            <S.Td>1.1234 seconds</S.Td>
          </tr>
          <tr>
            <S.Td>bbb7484c7c5f4190...</S.Td>
            <S.Td>TNB</S.Td>
            <S.Td>12/28/1986</S.Td>
            <S.Td>1.1234 seconds</S.Td>
          </tr>
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default History;
