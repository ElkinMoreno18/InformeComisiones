import Comisiones from "./Comisiones/Comisiones.js";
import Reportes from "./Reportes/Reportes";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Dashboard(){
    return (
        <>
        <Reportes></Reportes>
          <Routes>
            <Route path="/Comisiones" element={<Comisiones />}></Route>
          </Routes>
      </>
    );
}

export default Dashboard;
