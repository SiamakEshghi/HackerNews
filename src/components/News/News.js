//@flow
import * as React from 'react';

import useApi from '../../hooks/apiHook';
import useScroll from '../../hooks/scrollHook';
import SearchInput from '../Shared/SearchInput/SearchInput';
import StoriesList from './StoriesList/StoriesList';
import Spinner from '../Shared/Spinner/Spinner';
import ErrorModal from '../Shared/ErrorModal/ErrorModal';
import styles from './News.module.scss';

export const searchIdentifers = {
  firstAttempt: 'FIRST_ATTEMPT',
  moreAttempt: 'MORE_ATTEMPT',
};
export const API_URL = 'http://hn.algolia.com/api/v1/search';

type NewsProps = {};

const News = (props: NewsProps): React.Node => {
  const [query, setQuery] = React.useState('');
  const [hits, setHits] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');
  const pageRef = React.useRef(0);
  const nbPagesRef = React.useRef(0);
  const timeoutRef = React.useRef();
  const searchRef = React.useRef();

  const { loading, data, error, sendRequest, clear, apiIdentifier } = useApi();
  const isScrolledToBottom = useScroll();

  const searchHandler = React.useCallback(
    (identifier, searchQuery) => {
      if (searchQuery === '') {
        pageRef.current = 0;
        nbPagesRef.current = 0;
        setTotal(0);
        setHits([]);
        return;
      }

      const params = {
        query: searchQuery,
        tags: 'story',
        page: pageRef.current,
      };
      sendRequest(API_URL, 'GET', params, identifier);
    },
    [sendRequest]
  );

  const searchChangeHandler = React.useCallback(
    (e) => {
      const searchQuery = e.target.value;
      setQuery(searchQuery);

      //debouncing
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => searchHandler(searchIdentifers.firstAttempt, searchQuery),
        300
      );
    },
    [searchHandler]
  );

  React.useEffect(() => {
    searchRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (error) {
      switch (apiIdentifier) {
        case searchIdentifers.firstAttempt:
          setErrorMessage('Something went wrong in first attempt!');
          break;
        case searchIdentifers.moreAttempt:
          setErrorMessage('Something went wrong in more attempt!');
          break;
        default:
          break;
      }
      clear();
    } else if (data) {
      switch (apiIdentifier) {
        case searchIdentifers.firstAttempt:
          nbPagesRef.current = data.nbPages;
          setTotal(data.nbHits);
          setHits(data.hits);
          break;
        case searchIdentifers.moreAttempt:
          setHits((prevHits) => [...prevHits, ...data.hits]);
          break;
        default:
          break;
      }
      clear();
    }
  }, [error, data, loading, clear, apiIdentifier]);

  React.useEffect(() => {
    if (isScrolledToBottom) {
      if (pageRef.current < nbPagesRef.current - 1) {
        pageRef.current++;
        searchHandler(searchIdentifers.moreAttempt, query);
      }
    }
  }, [isScrolledToBottom, searchHandler, query]);

  return (
    <div className={styles.news}>
      <ErrorModal
        showModal={!!errorMessage}
        errorMessage={errorMessage}
        closeHandler={() => setErrorMessage('')}
      />
      <SearchInput
        searchHandler={searchHandler}
        changeHandler={searchChangeHandler}
        query={query}
        ref={searchRef}
      />
      <p className={styles.total}>{`${total} Results found`}</p>
      <div className={styles.results}>
        <StoriesList hits={hits} />
      </div>
      {loading && <Spinner customClass={styles.spinner} />}
    </div>
  );
};

export default News;
