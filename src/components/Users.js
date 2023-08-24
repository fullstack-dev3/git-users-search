import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className="row">
      {users.map(user => (
        <div key={user.id} className="text-center py-3 col-md-2">
          <img
            src={user.avatar_url}
            alt=""
            className="rounded-circle center-block"
            style={{ width: "60px", margin: "0 auto" }}
          />
          <h5>{user.login}</h5>
          <div>
            <Link to={`/user/${user.login}`} className="btn btn-info btn-sm my-1 px-3">
              More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
}

export default Users;