import React, { useState } from "react";
import logoTotal from "../../../infinivirt_logo.png";
import logoSmall from "../../../nube_infinivirt.png";
import styles from "../Menu/styles.css";
import App from "../../../App";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  HomeOutlined,
  ReconciliationOutlined,
  AreaChartOutlined,
  SolutionOutlined,
  PhoneOutlined,
  DownloadOutlined,
  DashboardOutlined,
  HistoryOutlined,
  HddOutlined,
  DollarOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

var url_base = "http://localhost:8080";

const MenuPage = (props) => {
  const history = useNavigate();
  var collapsed = props.collapsed;
  const [selectedMenuItem, setSelectedMenuItem] = useState("item1");
  var infoLogin = props.infoLogin;

  const logout = () => {
    var request = "/api/session/logout";
    axios.get(url_base + request, { withCredentials: true }).then((res) => {});
    history("/");
    window.location.reload(true);
  };

  var showComitions = false;

  if (
    infoLogin.username == "leidy.tangarife" ||
    infoLogin.username == "andres.mesa" ||
    infoLogin.username == "sergio.munoz" ||
    infoLogin.username == "sandra.ramos" ||
    infoLogin.username == "maria.zapata" ||
    infoLogin.username == "ingry.marquez" ||
    infoLogin.username == "jorge.arango" ||
    infoLogin.username == "elkin.moreno"
  ) {
    showComitions = true;
  } else {
    showComitions = false;
  }

  return (
    <>
      <img
        alt="Logo Infinivirt"
        src={collapsed ? logoSmall : logoTotal}
        style={
          collapsed ? {} : { width: "70%", marginInline: "15%", height: "5%" }
        }
        className="logo bg-transparent"
        id="logo"
      />
      <Menu
        selectedKeys={selectedMenuItem}
        onClick={(e) => setSelectedMenuItem(e.key)}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item hidden={showComitions} key="1" icon={<HomeOutlined />}>
          <Link to="/Home" /> Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<ReconciliationOutlined />} title="Reportes">
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
            <Link to="/Ventas" />
            Informe de Ventas
          </Menu.Item>
          <Menu.Item key="4" icon={<SolutionOutlined />}>
            <Link to="/Margenes" />
            Informe de Margenes
          </Menu.Item>
          <Menu.Item key="5" icon={<PhoneOutlined />}>
            <Link to="/Vendors" />
            Informe de Vendors
          </Menu.Item>
        </SubMenu>
        <Menu.Item hidden={showComitions} key="6" icon={<DownloadOutlined />}>
          <Link to="/CDRs" />
          Descarga de CDRs
        </Menu.Item>
        <Menu.Item hidden={showComitions} key="7" icon={<DashboardOutlined />}>
          <Link to="/CallMonitor" />
          Call Monitor
        </Menu.Item>
        <Menu.Item hidden={showComitions} key="8" icon={<HistoryOutlined />}>
          <Link to="/DIDs" /> Historial de DIDs
        </Menu.Item>
        <Menu.Item hidden={showComitions} key="9" icon={<HddOutlined />}>
          <Link to="/Activos" />
          Inventario de Activos
        </Menu.Item>
        <Menu.Item hidden={!showComitions} key="10" icon={<DollarOutlined />}>
          <Link to="/Comisiones" />
          Reporte de Comisiones
        </Menu.Item>
        <Menu.Item
          hidden={showComitions}
          key="11"
          icon={<CalculatorOutlined />}
        >
          <Link to="/RTL" />
          Calculo de RTL
        </Menu.Item>
        <Menu.Item
          hidden={showComitions}
          key="12"
          icon={<CalculatorOutlined />}
        >
          <Link to="/SBC" />
          KPI SBCs
        </Menu.Item>
      </Menu>
      {collapsed ? (
        <img
          src="https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=logout"
          width={20}
          onClick={logout}
          style={{ marginLeft: "40%", cursor: "pointer", marginTop: "17%" }}
        ></img>
      ) : (
        <button
          onClick={logout}
          type="button"
          className=" w-75 btn btn-outline-light"
          style={{ marginLeft: "10%" }}
        >
          Cerrar Sesion
        </button>
      )}
    </>
  );
};

export default MenuPage;
