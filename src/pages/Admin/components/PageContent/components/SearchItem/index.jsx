import React from 'react';
import PropTypes from 'prop-types';

SearchItem.propsType = {
    search: PropTypes.string,
    onSearch: PropTypes.func,
    onSubmitSearch: PropTypes.func,
}

SearchItem.defaultProps ={
    search: "",
    onSearch: null,
    onSubmitSearch: null
}
function SearchItem(props) {
    const {search, onSearch, onSubmitSearch} = props

    const handleSearch = (e) => {
        if(onSearch) onSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(onSubmitSearch) onSubmitSearch()
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='search'>Search: </label>
            <input type="search" className='border-2 px-1' value={search} onChange={(e) => handleSearch(e)}/>
        </form>
    );
}

export default SearchItem;