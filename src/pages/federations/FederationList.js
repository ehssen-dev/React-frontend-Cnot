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
import FederationService from "../../services/CommunicationInterne/FederationService"; // Adjust the import path

const FederationList = () => {
  const [federations, setFederations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFederations = async () => {
      try {
        const data = await FederationService.getAllFederations();
        setFederations(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch federations");
        console.error("Failed to fetch federations:", error);
        setLoading(false);
      }
    };

    fetchFederations();
  }, []);

  const handleViewDetails = (federationId) => {
    navigate(`/admin/federation-list/${federationId}`);
  };

  const handleEdit = (federationId) => {
    navigate(`/admin/federations/edit/${federationId}`);
  };

  const handleDelete = async (federationId) => {
    try {
      await FederationService.deleteFederation(federationId);
      setFederations((prev) =>
        prev.filter((fed) => fed.federationId !== federationId)
      );
      message.success("Federation deleted successfully!");
    } catch (error) {
      setError("Failed to delete federation");
      console.error("Failed to delete federation:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/federation-list/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Federation ID",
      dataIndex: "federationId",
      key: "federationId",
    },
    {
      title: "Federation Number",
      dataIndex: "federationNumber",
      key: "federationNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.federationId)}
          >
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.federationId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.federationId)}
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
    total: federations.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Federation List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Federation
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={federations}
        pagination={paginationProps}
        rowKey="federationId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default FederationList;
