import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ setAlert, searchUsers }) => {
  const [text, setText] = useState('');
 
  const onSubmit = e => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "secondary");
    } else {
      searchUsers(text);
    }
  };

  const onChange = e => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="text"
          className="form-control"
          placeholder="Search users..."
          value={text}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
    </form>
  );
}

Search.propTypes = {
  setAlert: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
};

export default Search;