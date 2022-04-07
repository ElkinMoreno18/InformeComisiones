import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Component } from "react";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/main";
import axios from "axios";
import Logo from "./Infinivirt_gris.png";
import User from "./Usuario.svg";
import Password from "./Password.svg";

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
    axios.post(request, info).then((res) => {
      this.setState({
        status: true,
        datos: res.data,
      });
    });
    ev.preventDefault();
  }

  render() {
    var data = this.state.datos;
    console.log(data.login);
    if (data.login == true) {
      return <Main infoLogin={this.state}></Main>;
    }

    return (
      <>
        {/* <section class="login-block">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-8 banner-sec">
                <div class="carousel-inner" role="listbox">
                  <img class="img-fluid" src={Logo} alt="Logo Infinivirt" />
                  <div class="mt-5">
                    <div class="banner-text">
                      <h2>Plataforma de Informacion Interna</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 login-sec">
                <h2 class="text-center">Login Now</h2>
                <form class="login-form">
                  <div class="input-group mb-3">
                  <img src={User} width={25}></img>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    >                     
                    </input>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1" class="text-uppercase">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder=""
                    />
                  </div>

                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input" />
                      <small>Remember Me</small>
                    </label>
                    <button type="submit" class="btn btn-login float-right">
                      Submit
                    </button>
                  </div>
                </form>
                <div class="copy-text"></div>
              </div>
            </div>
          </div>
        </section> */}
        <div
          className="col-7 bg-info"
          style={{ height: "100%", float: "left" }}
        >
          <img src={Logo} style={{ width: "30%" }}></img>
        </div>
        <div className="registration-form col-5" style={{height:"100vh !important;"}}>
          <form>
            <div>
              <h4 id="encabezado">Iniciar Sesion</h4>
            </div>
            <div className="input-wrapper">
              <img className="input-icon" src={User} />
              <input
                type="text"
                className="form-control item"
                placeholder="Email"
                style={{paddingLeft: "10%"}}
                value={this.state.username}
                onChange={(ev) => this.onChangeUsername(ev.target.value)}
                required={true}
              />
            </div>

            <div className="input-wrapper">
              <img className="input-icon" src={Password} />
              <input
                type="password"
                className="form-control item input"
                placeholder="Contraseña"
                value={this.state.password}
                style={{paddingLeft: "10%"}}
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

export default App;
