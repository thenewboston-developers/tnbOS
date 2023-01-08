import {ChangeEvent} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface InputProps {
  errors: {[field: string]: string};
  label: string;
  logo?: string;
  name: string;
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  touched: {[field: string]: boolean};
  type?: 'text' | 'number';
}

const Input: SFC<InputProps> = ({className, errors, logo, label, name, onChange, touched, type = 'text'}) => {
  const changeHandler = onChange
    ? {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          onChange?.(e);
        },
      }
    : {};

  return (
    <>
      <S.Label>{label}</S.Label>
      <S.FieldWrapper>
        <S.Field
          $error={errors[name] && touched[name]}
          className={className}
          name={name}
          type={type}
          {...changeHandler}
        />
        {logo ? <S.Logo src={logo} /> : null}
      </S.FieldWrapper>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
