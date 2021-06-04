import React, { memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './search.module.css';

const Search = memo(({ onSearch, logoName }) => {
  const input = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const query = input.current.value;

    query && onSearch(query);

    input.current.value = '';
  };

  return (
    <form className={styles.inputBox} onSubmit={onSubmit}>
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
        <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
      </button>
    </form>
  );
});

export default Search;
