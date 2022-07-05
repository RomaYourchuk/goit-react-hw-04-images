import s from './Searchbar.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Searchbar({ children, onSubmitClick, ...allyProps }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubjectChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmitClick(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <input
          className={s.SearchFormInput}
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSubjectChange}
          placeholder="Search images and photos"
        />
        <button className={s.SearchFormButton} type="submit" {...allyProps}>
          {children}
        </button>
      </form>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmitClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default Searchbar;