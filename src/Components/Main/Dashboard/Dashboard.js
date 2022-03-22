import Comisiones from "./Comisiones/Comisiones.js";
import Reportes from "./Reportes/Reportes";
import RTL from './RTL/RTL'
import API from './RTL/prueba'
import React, { useState, useEffect } from "react";
import authService from "../../../Services/auth.service.js";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
  };

  return (
    <>
    <Reportes></Reportes>
      <Routes>
        <Route path="/Comisiones" element={<Comisiones />}></Route>
        <Route path="/RTL" element={<API></API>}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
