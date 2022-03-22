import './App.css';
import Main from './Components/Main/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Component } from 'react';
import Login from './Components/Login/Login'
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class App extends Component {
  render() {
    return(
    <Main />
    );
  }
}

export default App;
