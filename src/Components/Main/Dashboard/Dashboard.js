import Comisiones from "./Comisiones/Comisiones.js";
import Reportes from "./Reportes/Reportes";
import RTL from "./RTL/RTL";
import API from "./RTL/prueba";
import SBC from "./SBC/sbc";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const infoLogin = this.props.infoLogin;

    return (
      <>
        <Reportes></Reportes>
        <Routes>
          <Route path="/Comisiones" element={<Comisiones infoLogin={infoLogin}/>} ></Route>
          <Route path="/RTL" element={<API></API>}></Route>
          <Route path="/SBC" element={<SBC></SBC>}></Route>
        </Routes>
      </>
    );
  }
}

export default Dashboard;
