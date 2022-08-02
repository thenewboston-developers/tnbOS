import {SFC} from 'system/types';
import * as S from './Styles';

export interface InputProps {
  errors: {[field: string]: string};
  label: string;
  name: string;
  touched: {[field: string]: boolean};
}

const Input: SFC<InputProps> = ({className, errors, label, name, touched}) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.Field $error={errors[name] && touched[name]} name={name} className={className} />
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
