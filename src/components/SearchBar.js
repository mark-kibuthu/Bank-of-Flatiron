import React from 'react';

function SearchBar({ onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search by description"
      onChange={handleChange}
    />
  );
}

export default SearchBar;
