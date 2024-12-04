import React from "react";
import { Card, Button, Row, Col } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "30px" }}>
      {/* Add Slider component here */}
      <h2>Welcome to Your Dashboard</h2>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {[
          {
            title: "Dashboard",
            icon: <DashboardOutlined />,
            link: "/members/dashboard-c",
            description: "View your dashboard",
          },
          {
            title: "Events",
            icon: <DashboardOutlined />,
            link: "/members/events",
            description: "View The Events",
          },
          {
            title: "Support",
            icon: <DashboardOutlined />,
            link: "/members/support-request",
            description: "Request A Support",
          },
          {
            title: "Support Response",
            icon: <DashboardOutlined />,
            link: "/members/support-response",
            description: "View your Support",
          },
          {
            title: "Profile",
            icon: <UserOutlined />,
            link: "/members/profile",
            description: "Manage your profile",
          },
          {
            title: "file-manager",
            icon: <BellOutlined />,
            link: "/members/file-manager",
            description: "View your files ",
          },
          {
            title: "mails",
            icon: <SettingOutlined />,
            link: "/members/mails",
            description: "Manage your mails",
          },
        ].map(({ title, icon, link, description }) => (
          <Col xs={24} sm={12} md={6} key={title}>
            <Card
              title={title}
              bordered={false}
              hoverable
              style={{ width: "100%", textAlign: "center" }}
              actions={[<Link to={link}>{icon}</Link>]}
            >
              <p>{description}</p>
              <Link to={link}>
                <Button type="primary" icon={icon}>
                  {title}
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
