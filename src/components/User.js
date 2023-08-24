import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const User = ({ match, user, repos, getUser, getUserRepos }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>

      {user && (
        <div className="card my-2 p-3">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                className="rounded-circle"
                style={{ width: "150px" }}
                src={user.avatar_url}
                alt=""
              />
              <h5>{user.name}</h5>
              <p>Location: {user.location}</p>
            </div>
            <div className="col-md-8">
              <h3>Bio</h3>
              <p>{user.bio}</p>
              <a className="btn btn-primary my-1" href={user.html_url} role="button">
                Visit Github Profile
              </a>
              <ul className="list-group">
                <li className="list-group-item border-0">
                  {user.login && (
                    <Fragment>
                      <strong>Username: </strong>
                      {user.login}
                    </Fragment>
                  )}
                </li>
                <li className="list-group-item border-0">
                  {user.company && (
                    <Fragment>
                      <strong>Company: </strong>
                      {user.company}
                    </Fragment>
                  )}
                </li>
                <li className="list-group-item border-0">
                  {user.blog && (
                    <Fragment>
                      <strong>Website: </strong>
                      {user.blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-center p-2">
            <span className="badge badge-primary mr-2">Followers: {user.followers}</span>
            <span className="badge badge-secondary mr-2">Following: {user.following}</span>
            <span className="badge badge-success mr-2">
              Public Repos: {user.public_repos}
            </span>
            <span className="badge badge-info mr-2">
              Public Gists: {user.public_gists}
            </span>
          </div>
        </div>
      )}

      {repos && (
        repos.map((repo) => (
          <div className="card mb-2" key={repo.id}>
            <div className="card-body py-2">
              <a
                className="card-link"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </div>
          </div>
        ))
      )}
    </Fragment>
  );
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  repos: PropTypes.array,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
};

export default User;