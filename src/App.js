import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Component } from "react";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/main";
import axios from "axios";
import Logo from "./Infinivirt_gris.png";

var url_base = "http://localhost:8080";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: false,
      datos: [],
    };

    this.sendDataLogin = this.sendDataLogin.bind(this);
  }

  onChangeUsername(username) {
    this.setState({
      username: username,
    });
  }

  onChangePassword(password) {
    this.setState({
      password: password,
    });
  }

  sendDataLogin(ev) {
    const username = this.state.username;
    const password = this.state.password;
    var request = url_base + "/api/session/login";
    var info = {
      username: username,
      password: password,
    };
    ev.preventDefault();
    axios.post(request, info).then((res) => {
      this.setState({
        status: true,
        datos: res.data,
      });
    });
  }

  render() {
    var data = this.state.datos;
    if (data.login == true) {
      return <Main infoLogin={this.state}></Main>;
    } else {
      return (
        <>
          <div className="registration-form">
            <form>
              <img
                style={{ width: "80%", marginLeft: "10%", marginTop: "0" }}
                src={Logo}
              ></img>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    👤
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control item"
                  placeholder="Email"
                  value={this.state.username}
                  onChange={(ev) => this.onChangeUsername(ev.target.value)}
                  required={true}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    🔑
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control item"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={(ev) => this.onChangePassword(ev.target.value)}
                  required={true}
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-outline-primary login"
                  onClick={(ev) => this.sendDataLogin(ev)}
                >
                  <span>Iniciar Sesion</span>
                </button>
              </div>
            </form>
          </div>
        </>
      );
    }
  }
}

export default App;
