import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Component } from "react";
import Main from "./Components/Main/main";
import axios from "axios";
import Logo from "./Infinivirt_gris.png";
import User from "./Usuario.svg";
import Password from "./Password.svg";
import swal from "sweetalert";

var CryptoJS = require("crypto-js");

var url_base = process.env.REACT_APP_DB_HOST;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      status: false,
      datos: [],
    };
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

  pulsarEnter(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("loginBtn").click();
    }
  }

  sendDataLogin(ev) {
    const username = this.state.username.toLowerCase();
    const password = this.state.password;

    var cipherTextPass = CryptoJS.AES.encrypt(
      password,
      "intrainfinivirt"
    ).toString();

    let header = {
      withCredentials: true,
    };
    var request = "/api/session/login";

    if (username == "" || password == "") {
      swal("Campos requeridos", "Por favor, digite todos los campos", "info");
    }

    axios
      .post(url_base + request, { username, cipherTextPass }, header)
      .then((res) => {
        this.setState({
          status: true,
          datos: res.data,
        });
        if (res.data.login == false) {
          swal("Error", "Credenciales Incorrectas", "error");
        }
      });
  }

  consultIsLogged() {
    var request = "/api/session/isLogged";
    axios
      .get(url_base + request, { withCredentials: true })
      .then((res) => {
        this.setState({
          dataLogged: res.data,
        });
      })
      .catch((err) => {
        if (err.response) {
          this.setState({
            errors: err.response.status,
          });
        }
      });
  }

  componentDidMount() {
    this.consultIsLogged();
  }

  render() {
    var data = this.state.datos;
    var dataLogin = this.state.dataLogged;

    if (dataLogin !== undefined) {
      if (dataLogin.login == true) {
        this.state.username = dataLogin.username;
        return <Main infoLogin={this.state}></Main>;
      }
    }

    if (data.login == true) {
      return <Main infoLogin={this.state}></Main>;
    } else {
      return (
        <>
          <div
            className="col-8"
            style={{ height: "100vh !important", float: "left" }}
          >
            <div class="container">
              <img
                src={Logo}
                id="LogoInicial"
                style={{ width: "50%", marginTop: "20%", marginLeft: "25%" }}
              ></img>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
              <div class="circle-container">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <div
            className="registration-form col-4"
            style={{ height: "100vh !important;" }}
          >
            <h5 id="encabezado">Iniciar Sesion</h5>
            <div className="input-wrapper initial">
              <img className="input-icon" src={User} />
              <input
                type="text"
                className="form-control item input"
                placeholder="Email"
                style={{ paddingLeft: "10%" }}
                value={this.state.username}
                onChange={(ev) => this.onChangeUsername(ev.target.value)}
                onKeyUp={(e) => this.pulsarEnter(e)}
              />
            </div>
            <div className="input-wrapper secondary">
              <img className="input-icon" src={Password} />
              <input
                type="password"
                className="form-control item input"
                placeholder="Contraseña"
                value={this.state.password}
                style={{ paddingLeft: "10%" }}
                onChange={(ev) => this.onChangePassword(ev.target.value)}
                onKeyUp={(e) => this.pulsarEnter(e)}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn login"
                id="loginBtn"
                onClick={(ev) => this.sendDataLogin(ev)}
              >
                <span>Iniciar Sesion</span>
              </button>
            </div>
            <h6 style={{ marginTop: "30%", textAlign: "center" }}>
              &copy; Infinivirt 2022
            </h6>
          </div>
        </>
      );
    }
  }
}

export default App;
