import Dashboard from "./Dashboard/Dashboard";
import HeaderPage from "./Header/header";
import FooterPage from "./Footer/Footer";
import MenuPage from "./Menu/Menu";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import main from "./main.css";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

class Main extends React.Component {
  state = {
    collapsed: false,
    mensaje: "",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  render() {
    const footerStyle = { height: "5%", lineHeight: "50%"};

    return (
      <div>
        <Layout>
          <Sider width={"18%"} trigger={null} collapsible collapsed={this.state.collapsed}>
            <MenuPage collapsed={this.state.collapsed}>
            </MenuPage>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "10px 10px",
                padding: 10,
                height: "100%",
                minHeight: "100vh",
              }}
            >
              <Dashboard />
            </Content>
            <Footer style={footerStyle} className="text-center">
              <FooterPage></FooterPage>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Main;
