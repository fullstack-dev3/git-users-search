import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
export class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar icon="fab fa-github" title="Github Finder" />
      </div>
    );
  }
}

export default App;