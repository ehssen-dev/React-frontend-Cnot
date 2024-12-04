import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/UserService";

// Role name mapping
const roleNameMapper = {
  ROLE_USER: "USER",
  ROLE_ADMIN: "ADMIN",
  ROLE_MODERATOR: "MODERATOR",
  ROLE_ATHLETE: "ATHLETE",
  ROLE_DELEGATION: "DELEGATION",
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewDetails = (userId) => {
    navigate(`/admin/user-list/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.userId !== userId));
      message.success("User deleted successfully!");
    } catch (error) {
      setError("Failed to delete user");
      console.error("Failed to delete user:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/user-list/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Identifier",
      dataIndex: "identifier",
      key: "identifier",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) =>
        roles.map((role) => roleNameMapper[role.name] || role.name).join(", "),
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.userId)}
          >
            View Details
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.userId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const paginationProps = {
    current: page,
    pageSize,
    total: users.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New User
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        pagination={paginationProps}
        rowKey="userId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default UserList;
