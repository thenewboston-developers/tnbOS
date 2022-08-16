import {InputProps} from 'apps/Chat/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const Input: SFC<InputProps> = ({className, errors, name, placeholder = '', touched, type = 'text'}) => {
  return (
    <>
      <S.Field
        $error={errors[name] && touched[name]}
        className={className}
        name={name}
        placeholder={placeholder}
        type={type}
      />
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
