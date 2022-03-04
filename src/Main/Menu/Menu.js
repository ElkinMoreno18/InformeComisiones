import React, { createContext, useState } from "react";
import styles from "./styles.css";
import logoTotal from "../../infinivirt_logo.png";
import logoSmall from "../../nube_infinivirt.png";
import "antd/dist/antd.css";
import Ventas from "../Dashboard/Reportes/Ventas/Ventas";
import { Menu } from "antd";

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
} from "@ant-design/icons";

const { SubMenu } = Menu;


const MenuPage = (props) => {
  var collapsed = props.collapsed;

  return (
    <>
      <img
        src={collapsed ? logoSmall : logoTotal}
        className="logo bg-transparent"
        id="logo"
      />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<ReconciliationOutlined />} title="Reportes">
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
              Informe de Ventas
          </Menu.Item>
          <Menu.Item key="4" icon={<SolutionOutlined />}>
            Informe de Margenes
          </Menu.Item>
          <Menu.Item key="5" icon={<PhoneOutlined />}>
            Informe de Vendors
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="6" icon={<DownloadOutlined />}>
          Descarga de CDRs
        </Menu.Item>
        <Menu.Item key="7" icon={<DashboardOutlined />}>
          Call Monitor
        </Menu.Item>
        <Menu.Item key="8" icon={<HistoryOutlined />}>
          Historial de DIDs
        </Menu.Item>
        <Menu.Item key="9" icon={<HddOutlined />}>
          Inventario de Activos
        </Menu.Item>
        <Menu.Item key="`0" icon={<DollarOutlined />}>
          Reporte de Comisiones
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuPage;
