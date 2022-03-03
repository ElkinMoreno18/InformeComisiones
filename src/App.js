import logo from './logo.svg';
import './App.css';
import Main from './Main/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Component } from 'react';


class App extends Component {
  render() {
    return(
      <div style={{height: "100%"}}>
    <Main />
      </div>
    );
  }
}

export default App;
