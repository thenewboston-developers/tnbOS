import {forwardRef, HTMLAttributes} from 'react';

import {GenericVoidFunction} from 'shared/types';
import * as S from './Styles';

export interface NetworkSelectorOptionProps extends HTMLAttributes<HTMLDivElement> {
  balance: number | null;
  displayImage: string;
  displayName: string;
  onClick: GenericVoidFunction;
}

const NetworkSelectorOption = forwardRef<HTMLDivElement, NetworkSelectorOptionProps>(
  ({balance, className, displayImage, displayName, onClick}, ref) => {
    return (
      <S.Container className={className} onClick={onClick} ref={ref}>
        <S.Img alt="logo" src={displayImage} />
        <S.Right>
          <S.DisplayName>{displayName}</S.DisplayName>
          {balance !== null ? <S.Balance>Balance: {balance}</S.Balance> : null}
        </S.Right>
      </S.Container>
    );
  },
);

export default NetworkSelectorOption;
