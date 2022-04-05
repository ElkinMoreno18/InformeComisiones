import React, { useState } from "react";
import logoTotal from "../../../infinivirt_logo.png";
import logoSmall from "../../../nube_infinivirt.png";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link } from 'react-router-dom';

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
  CalculatorOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;


const MenuPage = (props) => {
  var collapsed = props.collapsed;
  const [selectedMenuItem, setSelectedMenuItem] = useState('item1');


  return (
    <>
      <img
      alt="Logo Infinivirt"
        src={collapsed ? logoSmall : logoTotal}
        style={collapsed ? {} : {width: '70%', marginInline: '15%', height: '5%' }}
        className="logo bg-transparent"
        id="logo"
      />
      <Menu selectedKeys={selectedMenuItem} onClick={(e) => setSelectedMenuItem(e.key)} theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to='/Home'/> Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<ReconciliationOutlined />} title="Reportes">
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
          <Link to='/Ventas'/>Informe de Ventas
          </Menu.Item>
          <Menu.Item key="4" icon={<SolutionOutlined />}>
          <Link to='/Margenes'/>Informe de Margenes
          </Menu.Item>
          <Menu.Item key="5" icon={<PhoneOutlined />}>
          <Link to='/Vendors'/>Informe de Vendors
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="6" icon={<DownloadOutlined />}>
        <Link to='/CDRs'/>Descarga de CDRs
        </Menu.Item>
        <Menu.Item key="7" icon={<DashboardOutlined />}>
        <Link to='/CallMonitor'/>Call Monitor
        </Menu.Item>
        <Menu.Item key="8" icon={<HistoryOutlined />}>
        <Link to='/DIDs'/> Historial de DIDs
        </Menu.Item>
        <Menu.Item key="9" icon={<HddOutlined />}>
        <Link to='/Activos'/>Inventario de Activos
        </Menu.Item>
        <Menu.Item key="10" icon={<DollarOutlined />}>
        <Link to='/Comisiones' />Reporte de Comisiones
        </Menu.Item>
        <Menu.Item key="11" icon={<CalculatorOutlined />}>
        <Link to='/RTL' />Calculo de RTL
        </Menu.Item>
        <Menu.Item key="12" icon={<CalculatorOutlined />}>
        <Link to='/SBC' />KPI SBCs
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuPage;
