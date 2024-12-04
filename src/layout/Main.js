import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        {/* Header */}
        <Header />

        {/* Content Area */}
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px",
            minHeight: "calc(100vh - 63px)", // Adjust to ensure proper height
            maxHeight: "calc(100vh - 63px)",
            overflowY: "scroll",
          }}
        >
          {/* Outlet for nested routes */}
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Main;
