import React from "react";
import { Avatar, Button, Layout, Menu, Tooltip, Space, Typography } from "antd";
import {
  DashboardOutlined,
  ToolOutlined,
  MailOutlined,
  SettingOutlined,
  ScheduleOutlined,
  UserOutlined,
  ClusterOutlined,
  DollarOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
  SisternodeOutlined,
  RiseOutlined,
  SubnodeOutlined,
  ApartmentOutlined,
  TrophyOutlined,
  TeamOutlined,
  FundOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  BarChartOutlined,
  UserSwitchOutlined,
  BankOutlined,
  FlagOutlined,
  SolutionOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/CnotLogo.png"; // Adjust the path as needed
import { Group } from "@mui/icons-material";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    label,
    children,
  };
}

const Sidebar = ({ collapsed, setCollapsed }) => {
  const items = [
    getItem(
      <NavLink to="/admin/dashboard">Dashboard</NavLink>,
      "dashboard",
      <DashboardOutlined />
    ),
    getItem(
      <NavLink to="/admin/department-list">Departments</NavLink>,
      "department",
      <Group />
    ),
    getItem(
      <Tooltip title="Purchasing Procedures" placement="right">
        <span>Purchasing Procedures</span>
      </Tooltip>,
      "purchasing-procedures",
      <ShoppingOutlined />,
      [
        getItem(
          <NavLink to="/admin/budget-tracking">Budget</NavLink>,
          "budget",
          <DollarOutlined />
        ),
        getItem(
          <NavLink to="/admin/invoice">Invoices</NavLink>,
          "invoices",
          <FileDoneOutlined />
        ),
        getItem(
          <NavLink to="/admin/project-list">Projects</NavLink>,
          "projects",
          <ScheduleOutlined />
        ),
        getItem(
          <NavLink to="/admin/purchase-order">Purchase Order</NavLink>,
          "purchase-order",
          <ShoppingOutlined />
        ),
        getItem(
          <NavLink to="/admin/procurement-request">
            Procurement Request
          </NavLink>,
          "procurement-request",
          <SisternodeOutlined />
        ),
      ]
    ),
    getItem(
      <Tooltip title="Mails" placement="right">
        <span>Mails</span>
      </Tooltip>,
      "mails",
      <MailOutlined />,
      [
        getItem(
          <NavLink to="/admin/mail-list">List of Mails</NavLink>,
          "mail-list",
          <MailOutlined />
        ),
        getItem(
          <NavLink to="/admin/send-mail">Send Mail</NavLink>,
          "send-mail",
          <SubnodeOutlined />
        ),
        getItem(
          <NavLink to="/admin/send-mails">Send Mails</NavLink>,
          "send-mails",
          <SubnodeOutlined />
        ),
      ]
    ),
    getItem(
      <Tooltip title="Competitions" placement="right">
        <span>Competitions</span>
      </Tooltip>,
      "competitions",
      <TrophyOutlined />,
      [
        getItem(
          <NavLink to="/admin/event-list">Events</NavLink>,
          "event-list",
          <CalendarOutlined />
        ),
        getItem(
          <NavLink to="/admin/game-list">Games</NavLink>,
          "game-list",
          <PlayCircleOutlined />
        ),
        getItem(
          <NavLink to="/admin/result-list">Results</NavLink>,
          "result-list",
          <BarChartOutlined />
        ),
      ]
    ),
    getItem(
      <NavLink to="/admin/financial-report">Financial Report</NavLink>,
      "financial-report",
      <FundOutlined />
    ),
    getItem(
      <Tooltip title="Members" placement="right">
        <span>Members</span>
      </Tooltip>,
      "members",
      <TeamOutlined />,
      [
        getItem(
          <NavLink to="/admin/athlete-list">Athletes</NavLink>,
          "athlete-list",
          <UserSwitchOutlined />
        ),
        getItem(
          <NavLink to="/admin/federation-list">Federations</NavLink>,
          "federation-list",
          <BankOutlined />
        ),
        getItem(
          <NavLink to="/admin/delegation-list">Delegations</NavLink>,
          "delegation-list",
          <FlagOutlined />
        ),
      ]
    ),
    getItem(
      <Tooltip title="Supports" placement="right">
        <span>Supports</span>
      </Tooltip>,
      "supports",
      <RiseOutlined />,
      [
        getItem(
          <NavLink to="/admin/support-requests">Support Requests</NavLink>,
          "support-requests",
          <SolutionOutlined />
        ),
        getItem(
          <NavLink to="/admin/support-responses">Support Responses</NavLink>,
          "support-responses",
          <CheckSquareOutlined />
        ),
      ]
    ),
    getItem(
      <NavLink to="/admin/user-list">Users</NavLink>,
      "user-list",
      <UserOutlined />
    ),
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={60}
      width={200}
      style={{
        backgroundColor: "#002140",
        color: "#fff",
      }}
    >
      <Button
        type="text"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginTop: "10px",
          color: "#fff",
          backgroundColor: "#001529",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {!collapsed ? (
          <div style={{ color: "#fff" }}>
            <span style={{ fontSize: "25px", fontWeight: "bold" }}>
              Cnot
              <span
                style={{
                  fontSize: "20px",
                  color: "skyblue",
                  fontWeight: "bold",
                }}
              >
                Connect
              </span>
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: 50,
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </Button>

      <Menu
        mode="inline"
        theme="dark"
        style={{
          height: "calc(100% - 120px)",
          borderRight: 0,
          paddingTop: "20px",
        }}
        items={items}
        defaultSelectedKeys={["dashboard"]}
      />

      <div
        style={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Space direction="vertical">
          <Avatar
            size={collapsed ? "small" : "large"}
            icon={<UserOutlined />}
          />
          {!collapsed && (
            <>
              <Typography.Text style={{ color: "#fff" }}></Typography.Text>
              <Typography.Text style={{ color: "skyblue" }}>
                Role: Administrator
              </Typography.Text>
            </>
          )}
          <Button
            type="text"
            icon={<SettingOutlined />}
            style={{
              color: "#fff",
              backgroundColor: "#001529",
              borderRadius: "8px",
            }}
          >
            {!collapsed && "Settings"}
          </Button>
        </Space>
      </div>
    </Sider>
  );
};

export default Sidebar;
