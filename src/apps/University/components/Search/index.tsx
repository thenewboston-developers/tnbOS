import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface SearchProps {
  onChange: GenericVoidFunction;
}

const Search: SFC<SearchProps> = ({className, onChange}) => {
  return (
    <S.Container className={className}>
      <S.Input onChange={onChange} placeholder="Search courses..." type="text" />
    </S.Container>
  );
};

export default Search;
