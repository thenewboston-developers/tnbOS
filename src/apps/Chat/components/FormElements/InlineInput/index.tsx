import {InputProps} from 'apps/Chat/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface InlineInputProps extends InputProps {
  width?: number;
}

const InlineInput: SFC<InlineInputProps> = ({
  className,
  errors,
  name,
  placeholder = '',
  touched,
  type = 'text',
  width,
}) => {
  return (
    <S.Field
      $error={errors[name] && touched[name]}
      className={className}
      name={name}
      placeholder={placeholder}
      type={type}
      width={width}
    />
  );
};

export default InlineInput;
