import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

SearchItem.propsType = {
  search: PropTypes.string,
  onSearch: PropTypes.func,
  onSubmitSearch: PropTypes.func,
};

SearchItem.defaultProps = {
  search: "",
  onSearch: null,
  onSubmitSearch: null,
};
function SearchItem(props) {
  const { search, onSearch, onSubmitSearch } = props;

  const { adminTask } = useParams();

  const handleSearch = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitSearch) onSubmitSearch();
  };

  const showPlaceHolder = () => {
    switch (adminTask) {
      case "products":
        return "type product name";
      case "categories":
        return "type category name";
      case "users":
        return "type phone number";

    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="search">Search: </label>
      <input
        type="search"
        className="border-2 px-1"
        value={search}
        onChange={(e) => handleSearch(e)}
        placeholder={showPlaceHolder()}
      />
    </form>
  );
}

export default SearchItem;
