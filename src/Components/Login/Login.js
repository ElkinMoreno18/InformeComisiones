import React, { useState, useRef } from "react";
import "./Login.css";
import Logo from "../../Infinivirt_gris.png";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import authService from "../../Services/auth.service";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Este campo es requerido !
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      authService.login(username, password).then(
        () => {
          props.history.push("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="registration-form">
        <form onSubmit={handleLogin} ref={form}>
          <img
            style={{ width: "80%", marginLeft: "10%", marginTop: "0" }}
            src={Logo}
          ></img>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                👤
              </span>
            </div>
            <input
              type="email"
              class="form-control item"
              placeholder="Email"
              aria-label="Username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                🔑
              </span>
            </div>
            <input
              type="password"
              class="form-control item"
              placeholder="Contraseña"
              aria-label="Username"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div class="form-group">
            <button
              type="submit"
              disabled={loading}
              class="btn btn-outline-primary login"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Iniciar Sesion</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn}></CheckButton>
        </form>
      </div>
    </>
  );
};

export default Login;
