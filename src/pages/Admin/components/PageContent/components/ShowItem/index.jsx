import PropTypes from 'prop-types';
import React from "react";


ShowItem.propsType = {
    show: PropTypes.string,
    onShowClick: PropTypes.func,
}

ShowItem.defaultProps = {
    show: "5",
    onShowClick: null
}

function ShowItem(props) {
    const {show, onShowClick} = props

    const handleOnchange = (e) => {
        if (onShowClick) onShowClick(e.target.value)
    }

  return (
    <div className="flex items-center gap-1">
      <label htmlFor="pagination">Show:</label>
      <select name="pagination" className="border-2" value={show} onChange={(e) => handleOnchange(e)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <div>items</div>
    </div>
  );
}

export default ShowItem;
