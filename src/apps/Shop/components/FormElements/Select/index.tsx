import {ChangeEvent, FocusEvent, forwardRef, ReactNode, useCallback} from 'react';
import {Field, FieldInputProps} from 'formik';

import {SelectOption} from 'apps/Shop/types';
import * as S from './Styles';

export interface SelectProps {
  className?: string;
  errors: {[field: string]: string};
  label: string;
  name: string;
  onBlur?(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onChange?(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onFocus?(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  options: SelectOption[];
  touched: {[field: string]: boolean};
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({className, errors, label, name, onBlur, onChange, onFocus, options, touched}, ref) => {
    const renderOptions = useCallback((): ReactNode => {
      if (!options.length) return <S.OptionEmptyState>{'No available options.'}</S.OptionEmptyState>;
      return options.map((option) => <S.Option key={option.value}>{option.value}</S.Option>);
    }, [options]);

    return (
      <S.Container className={className} ref={ref}>
        <S.Label>{label}</S.Label>
        <Field name={name}>
          {({field}: {field: FieldInputProps<string>}) => (
            <S.Select
              {...field}
              $error={errors[name] && touched[name]}
              className={className}
              name={name}
              onBlur={(e) => {
                field.onBlur(e);
                onBlur?.(e as any);
              }}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e as any);
              }}
              onFocus={(e) => {
                onFocus?.(e as any);
              }}
            >
              {renderOptions()}
            </S.Select>
          )}
        </Field>
        <S.SecondaryContainer>
          {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
        </S.SecondaryContainer>
      </S.Container>
    );
  },
);

export default Select;
