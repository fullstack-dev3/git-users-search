import React, { Component, Fragment  } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Users from "./components/Users";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null,
      loading: false,
      users: [],
    }
  }

  showAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    });

    setTimeout(() => this.alert = null, 5000);
  };

  searchUsers = async (query) => {
    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/search/users?q=${query}`);

    this.setState({
      loading: false,
      users: res.data?.items
    });
  };

  render() {
    const {
      alert,
      loading,
      users
    } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar icon="fab fa-github" title="Github Finder" />

          <div className="mt-4 col-md-9" style={{ margin: "auto" }}>
            {alert !== null && (
              <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" />{' '}
                {alert.msg}
              </div>
            )}

            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <Search
                    setAlert={this.showAlert}
                    searchUsers={this.searchUsers}
                  />

                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;