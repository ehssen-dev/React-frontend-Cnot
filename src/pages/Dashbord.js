import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ProjectStatusChart from "./charts/ProjectStatusChart";
import ProjectDurationChart from "./charts/ProjectDurationChart";
import DashboardPage from "../pages/DashboardPage";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      <DashboardPage />

      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Utilisateurs Actifs"
              value={1128}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Nouveaux Messages"
              value={93}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Projets Complétés"
              value={78}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
