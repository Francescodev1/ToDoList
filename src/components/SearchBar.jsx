import React from "react";

function SearchBar(props) {
  function handleChange(event) {
    props.onSearch(event.target.value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cerca note..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
