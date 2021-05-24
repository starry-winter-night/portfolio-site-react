import React, { memo, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css';

const Search = memo(({ FontAwesome, onSearch, logoName }) => {
  const input = useRef();

  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const query = input.current.value;

    query && onSearch(query);

    input.current.value = '';
  };

  return (
    <form className={styles.inputBox} onSubmit={handleSubmitSearch}>
      {logoName && (
        <img
          src={`/imgs/${logoName}`}
          alt={`${logoName}`}
          className={styles.logo}
        ></img>
      )}
      <input
        className={styles.searchInput}
        ref={input}
        placeholder="검색"
      ></input>
      <button className={styles.searchButton}>
        <FontAwesome className={styles.searchIcon} icon={faSearch} />
      </button>
    </form>
  );
});

export default Search;
