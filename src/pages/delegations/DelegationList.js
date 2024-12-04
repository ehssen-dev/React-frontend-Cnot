// src/components/DelegationList.js
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
import {
  getAllDelegations,
  deleteDelegation,
} from "../../services/CommunicationInterne/DelegationService"; // Adjust the import path

const DelegationList = () => {
  const [delegations, setDelegations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDelegations = async () => {
      try {
        const data = await getAllDelegations();
        setDelegations(data);
      } catch (error) {
        setError("Failed to fetch delegations");
        console.error("Failed to fetch delegations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelegations();
  }, []);

  const handleViewDetails = (delegationId) => {
    navigate(`/admin/delegation-list/${delegationId}`);
  };

  const handleEdit = (delegationId) => {
    navigate(`/admin/delegation-list/edit/${delegationId}`);
  };

  const handleDelete = async (delegationId) => {
    try {
      await deleteDelegation(delegationId);
      setDelegations((prev) =>
        prev.filter((delegation) => delegation.delegationId !== delegationId)
      );
      message.success("Delegation deleted successfully!");
    } catch (error) {
      setError("Failed to delete delegation");
      console.error("Failed to delete delegation:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/delegation-list/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Delegation ID",
      dataIndex: "delegationId",
      key: "delegationId",
    },
    {
      title: "Delegation Name",
      dataIndex: "delegationName",
      key: "delegationName",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
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
            onClick={() => handleViewDetails(record.delegationId)}
          >
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.delegationId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.delegationId)}
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
    total: delegations.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Delegation List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Delegation
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={delegations}
        pagination={paginationProps}
        rowKey="delegationId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default DelegationList;
