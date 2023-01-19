import {SFC} from 'system/types';
import * as S from './Styles';

export interface CheckboxProps {
  errors: {[field: string]: string};
  label: string;
  name: string;
  touched: {[field: string]: boolean};
}

const Checkbox: SFC<CheckboxProps> = ({className, errors, label, name, touched}) => {
  return (
    <>
      <S.Container>
        <S.Field $error={errors[name] && touched[name]} className={className} name={name} type="checkbox" />
        <S.Label>{label}</S.Label>
      </S.Container>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export {S as CheckboxStyles};
export default Checkbox;
