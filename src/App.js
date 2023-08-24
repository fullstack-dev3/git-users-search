import React, { Component, Fragment  } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import PageLinks from "./components/PageLinks";
import Users from "./components/Users";
import User from "./components/User";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      loading: false,
      query: '',
      current: 1,
      total: 0,
      pages: [],
      users: [],
      user: null,
      repos: [],
    }
  }

  showAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

    setTimeout(() => (
      this.setState({
        alert: null
      })
    ), 3000);
  };

  searchUsers = async (query, current = 1) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&page=${current}&per_page=20`
    );

    let pages = [];

    let total = Math.ceil(res.data.total_count / 30);
    if (total > 50) {
      total = 50;
    }

    if (total <= 10) {
      for (let i = 0; i < total; i++) {
        pages.push(i + 1);
      }
    } else {
      if (current > 3 && current < total - 2) {
        pages = [1, '...', current - 1, current, current + 1, '...', total];
      } else {
        pages = [1, 2, 3, 4, '...', total - 3, total - 2, total - 1, total];
      }
    }

    this.setState({
      loading: false,
      query,
      current,
      total,
      pages,
      users: res.data?.items
    });
  };

  handlePagination = async (current) => {
    await this.searchUsers(this.state.query, current);
  }

  getUser = async (username ) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(`https://api.github.com/users/${username}`);

    this.setState({
      loading: false,
      user: res.data
    });
  }

  getUserRepos = async (username ) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(`https://api.github.com/users/${username}/repos`);

    this.setState({
      loading: false,
      repos: res.data
    });
  }

  render() {
    const {
      alert,
      loading,
      query,
      current,
      total,
      pages,
      users,
      user,
      repos
    } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar icon="fab fa-github" title="Github User Finder" />

          <div className="mt-4 col-md-9" style={{ margin: "auto" }}>
            {alert !== null && (
              <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" />{' '}
                {alert.msg}
              </div>
            )}

            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Fragment>
                    <Search
                      query={query}
                      setAlert={this.showAlert}
                      searchUsers={this.searchUsers}
                    />

                    <div className="container">
                      {loading ? (
                        <div className="mt-5 d-flex justify-content-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <Fragment>
                          {total > 0 && (
                            <PageLinks
                              current={current}
                              last={total}
                              pages={pages}
                              handlePagination={this.handlePagination}
                            />
                          )}

                          <Users users={users} />

                          {total > 0 && (
                            <PageLinks
                              current={current}
                              last={total}
                              pages={pages}
                              handlePagination={this.handlePagination}
                            />
                          )}
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                )}
              />

              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    loading={loading}
                    user={user}
                    repos={repos}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;