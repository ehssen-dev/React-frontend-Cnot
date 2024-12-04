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
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust path as needed
import axios from "../api/Axios";
import CNOTLogo from "../assets/img/CnotConnectLogo.png"; // Import the CNOT logo

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
      <Menu.Item key="1" onClick={() => navigate("/members/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* Header */}
      <div
        style={{
          height: "63px",
          display: "flex",
          background: "#002B5C", // Dark blue background
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {/* CNOT Logo Button */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="text"
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "transparent",
            }}
          >
            <img
              src={CNOTLogo}
              alt="CNOT Logo"
              style={{ height: "40px", width: "40px", marginRight: "15px" }}
            />
          </Button>
          <Button
            type="text"
            style={{ fontWeight: "bold", color: "white" }}
            onClick={() => navigate("/members/dashboard-c")}
          >
            Dashboard
          </Button>
          <Button
            type="text"
            onClick={() => navigate("/members/events")}
            style={{ color: "white" }}
          >
            Events
          </Button>
          <Button
            type="text"
            onClick={() => navigate("/members/mails")}
            style={{ color: "white" }}
          >
            Mails
          </Button>
        </div>

        {/* Centered Search Bar */}
        <Input
          placeholder="Search..."
          prefix={<SettingOutlined style={{ color: "#888" }} />}
          style={{
            borderRadius: "20px",
            width: "300px",
            padding: "5px 15px",
          }}
        />

        {/* Right Section with Notifications and Profile */}
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
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {/* User/Athlete Icon */}
              <Avatar
                icon={<UserOutlined />}
                style={{ marginRight: "10px", backgroundColor: "#005B96" }}
              />
              <span style={{ color: "white" }}>
                {user ? user.name : "Not Logged In"}
              </span>
              <span style={{ color: "white", marginLeft: "10px" }}>
                {user && user.roles ? displayRoles : ""}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Back Button Below Header */}
      <div style={{ padding: "10px 20px", background: "#f0f0f0" }}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "15px" }}
        >
          Back
        </Button>
      </div>
    </>
  );
};

export default Header;
