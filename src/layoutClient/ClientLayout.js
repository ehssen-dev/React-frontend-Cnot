// src/layout/ClientLayout.js
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../layoutClient/Header"; // Ensure the path is correct
import Footer from "../layout/Footer"; // Common footer

const { Content } = Layout;

const ClientLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header should display correctly */}
      <Header />
      <Content style={{ padding: "20px", marginTop: "64px" }}>
        {/* Outlet for nested routes */}
        <Outlet />
      </Content>
      {/* Footer displayed at the bottom */}
      <Footer />
    </Layout>
  );
};

export default ClientLayout;
