import {SFC} from 'system/types';
import * as S from './Styles';

export interface InlineInputProps {
  errors: {[field: string]: string};
  name: string;
  placeholder?: string;
  touched: {[field: string]: boolean};
  width?: number;
}

const InlineInput: SFC<InlineInputProps> = ({className, errors, name, placeholder = '', touched, width}) => {
  return (
    <S.Field
      $error={errors[name] && touched[name]}
      className={className}
      name={name}
      placeholder={placeholder}
      width={width}
    />
  );
};

export default InlineInput;
