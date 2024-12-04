import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SupportResponseService from "../../../services/CommunicationInterne/SupportResponseService"; // Adjust import path

const SupportResponseList = () => {
  const [supportResponses, setSupportResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupportResponses = async () => {
      try {
        const data = await SupportResponseService.getAllSupportResponses();
        setSupportResponses(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch support responses");
        console.error("Failed to fetch support responses:", error);
        setLoading(false);
      }
    };

    fetchSupportResponses();
  }, []);

  const handleViewDetails = (supportResponseId) => {
    navigate(`/admin/support-responses/${supportResponseId}`);
  };

  const handleEdit = (supportResponseId) => {
    navigate(`/admin/support-responses/edit/${supportResponseId}`);
  };

  const handleDelete = async (supportResponseId) => {
    try {
      await SupportResponseService.deleteSupportResponse(supportResponseId);
      setSupportResponses((prev) =>
        prev.filter(
          (response) => response.supportResponseId !== supportResponseId
        )
      );
      message.success("Support response deleted successfully!");
    } catch (error) {
      setError("Failed to delete support response");
      console.error("Failed to delete support response:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/support-responses/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Response ID",
      dataIndex: "supportResponseId",
      key: "supportResponseId",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Amount",
      dataIndex: "montant",
      key: "montant",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.supportResponseId)}
          >
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.supportResponseId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.supportResponseId)}
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
    total: supportResponses.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Support Response List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Support Response
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={supportResponses}
        pagination={paginationProps}
        rowKey="supportResponseId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default SupportResponseList;
