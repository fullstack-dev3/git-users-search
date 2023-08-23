import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Users = ({ loading, users }) => {
  if (loading) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
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
      </div>
    );
  }
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Users;