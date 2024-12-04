import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, Menu, Space, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import MailService from "../../services/CommunicationInterne/mailService";

const MailList = () => {
  const [mails, setMails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllMails = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // in seconds
          if (decodedToken.exp < currentTime) {
            setError("Token expired. Please log in again.");
            setLoading(false);
            return;
          }
        } catch (error) {
          setError("Invalid token. Please log in again.");
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch("http://localhost:8080/api/mails/all-em", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized: Please log in.");
          } else if (response.status === 403) {
            setError("Forbidden: You don't have permission.");
          } else {
            setError("An error occurred.");
          }
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        setMails(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error fetching mails.");
      }
    };

    fetchAllMails();
  }, []);

  const handleEdit = (mailId) => {
    navigate(`/admin/mails/edit/${mailId}`);
  };

  const handleDelete = async (mailId) => {
    try {
      await MailService.deleteMail(mailId);
      setMails((prev) => prev.filter((mail) => mail.mailId !== mailId));
      message.success("Mail deleted successfully!");
    } catch (err) {
      setError("Failed to delete mail!");
      console.error("Delete Error:", err);
    }
  };

  const handleDetails = (mailId) => {
    navigate(`/admin/mail-list/${mailId}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Receiver",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Attachment",
      dataIndex: "attachments",
      key: "attachments",
      render: (attachments) =>
        attachments && attachments.length > 0
          ? attachments.map((attachment) => (
              <div key={attachment.id}>{attachment.fileName}</div>
            ))
          : "None",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, mail) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleDetails(mail.mailId)}
          >
            Details
          </Button>

          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(mail.mailId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  const paginationProps = {
    current: page,
    pageSize,
    total: mails.length,
    onChange: (page, pageSize) => {
      setPage(page);
      setPageSize(pageSize);
    },
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  const categoryMenu = (
    <Menu>
      {["All", "Athletes", "Users", "Delegations"].map((category) => (
        <Menu.Item
          key={category}
          onClick={() => handleCategorySelect(category)}
        >
          {category}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        <MailIcon sx={{ mr: 1 }} />
        Mail List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Dropdown overlay={categoryMenu}>
          <Button>
            {selectedCategory} <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={mails}
        pagination={paginationProps}
        rowKey="mailId"
        bordered
      />
    </div>
  );
};

export default MailList;
