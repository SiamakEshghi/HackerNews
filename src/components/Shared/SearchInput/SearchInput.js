//@flow
import * as React from 'react';

import { searchIdentifers } from '../../News/News';
import styles from './SearchInput.module.scss';

type SearchProps = {
  changeHandler: (SyntheticInputEvent<HTMLInputElement>) => void,
  query: string,
};

const Search = (props: SearchProps): React.Node => {
  const { changeHandler, query } = props;

  return (
    <input
      className={styles.input}
      type="text"
      value={query}
      placeholder={'Search for the news'}
      onChange={changeHandler}
      name="search"
    />
  );
};

export default Search;
