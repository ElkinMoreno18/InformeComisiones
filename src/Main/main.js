import Dashboard from "./Dashboard/Dashboard";
import HeaderPage from "./Header/header";
import FooterPage from "./Footer/Footer";
import MenuPage from "./Menu/Menu";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import style from "./main.css";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;


class Main extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div className=`{style.main}`>
            <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <MenuPage></MenuPage>
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
              padding: 24,
              height: "100%",
              minHeight: 280,
            }}
          >
            <Dashboard />
          </Content>
          <Footer className="text-center"> &copy; Infinivirt 2022</Footer>
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default Main;
