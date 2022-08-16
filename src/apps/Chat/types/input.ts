export interface InputProps {
  errors: {[field: string]: string};
  name: string;
  placeholder?: string;
  touched: {[field: string]: boolean};
  type?: 'text' | 'number';
}
