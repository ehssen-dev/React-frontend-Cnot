import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
  theme,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust path as needed
import axios from "../api/Axios";

const Header = () => {
  const [unreadEmailCount, setUnreadEmailCount] = useState([]);
  const [config, setConfig] = useState([]);
  const { user, logout } = useAuth(); // Use Auth context

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getConfigColor = (configId) => {
    const configItem = config.find((item) => item.id === configId);
    return configItem ? configItem.color : "";
  };

  const fetchUnreadEmailCount = async () => {
    try {
      const response = await axios.get("/api/emailNotseen");
      const data = response.data;
      setUnreadEmailCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getConfig = async () => {
    try {
      const response = await axios.get("/api/Listconfig");
      const data = response.data;
      setConfig(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    fetchUnreadEmailCount();
    getConfig();
  }, []);

  const roleLabels = {
    ROLE_ADMIN: "Admin",
    ROLE_USER: "Guest",
    ROLE_MODERATOR: "Moderator",
    ROLE_ATHLETE: "Athlete",
    ROLE_DELEGATION: "Delegation",
  };

  // Format roles for display
  const displayRoles = user?.roles
    ? user.roles.map((role) => roleLabels[role] || "Unknown").join(", ")
    : "Not Logged In";

  // Create a menu for the dropdown
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate("/admin/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        height: "63px",
        display: "flex",
        background: colorBgContainer,
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* Left section with Back button and menu */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Space size={20} style={{ marginLeft: "20px" }}>
          <Button
            type="text"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </Button>
          <Button
            type="text"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/admin/project-list")}
          >
            Projects
          </Button>
          <Button
            type="text"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/admin/mail-list")}
          >
            Mails
          </Button>
          <Button
            type="text"
            style={{ fontWeight: "bold" }}
            onClick={() => navigate("/admin/financial-report")}
          >
            Reports
          </Button>
        </Space>
      </div>

      {/* Centered search bar */}
      <Input
        placeholder="Search..."
        prefix={<SettingOutlined />}
        style={{
          borderRadius: "20px",
          width: "300px",
          padding: "5px 15px",
        }}
      />

      {/* Right section with notifications and profile */}
      <div
        className="avatar-info"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Space size={24} style={{ marginRight: "20px" }}>
          {unreadEmailCount.map((item) => (
            <Badge count={item.unread_count || 0} key={item.config_id}>
              <Avatar
                icon={<MailOutlined />}
                style={{
                  backgroundColor: getConfigColor(item.config_id),
                }}
              />
            </Badge>
          ))}
        </Space>

        {/* User Icon with Dropdown Menu */}
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar
              style={{
                backgroundColor: user ? "green" : "gray",
                marginRight: "10px",
              }}
              icon={<UserOutlined />}
            />
            <span>{user ? user.name : "Not Logged In"}</span>
            <span>{user && user.roles ? displayRoles : ""}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
