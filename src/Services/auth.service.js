import axios from "axios";
const API_URL = "http://10.10.101.45:8082/api/v1/login/";

const login = (username, password) => {
  return axios.post(API_URL, { username, password }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
