import React from 'react';
import './compaign.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({ searchInput, handleSearchInputChange }) => {
  return (
    <div className="d-flex w-100">
      <div className="input-container w-100">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="compaignSearch form-control w-100 bg-transparent text-dark border-0 borderless-input ps-5"
          placeholder="Search"
        />
        <SearchRoundedIcon className="search-icon" />
      </div>
    </div>
  );
};

export default SearchBar;
