import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

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
    this.loading = true;

    const res = await axios.get(`https://api.github.com/search/users?q=${query}`);

    this.users = res.data?.items;
    this.loading = false;
  };

  render() {
    const {
      alert
    } = this.state;

    return (
      <div className="App">
        <Navbar icon="fab fa-github" title="Github Finder" />

        <div className="mt-5 col-md-9" style={{ margin: "auto" }}>
          {alert !== null && (
            <div className={`alert alert-${alert.type}`}>
              <i className="fas fa-info-circle" />{' '}
              {alert.msg}
            </div>
          )}

          <Search
            setAlert={this.showAlert}
            searchUsers={this.searchUsers}
          />
        </div>
      </div>
    );
  }
}

export default App;