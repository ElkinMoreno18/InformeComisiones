import React from "react";
import "./Login.css";
import Logo from "../../Infinivirt_gris.png";

class Login extends React.Component {
  render() {
    return (
      <>
        <div className="registration-form">
          <form>
            <img
            alt="Logo Infinivirt"
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
                type="text"
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

export default Login;
