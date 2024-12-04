// src/components/SupportRequestList.js
import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllSupportRequestsF } from "../../../services/CommunicationInterne/SupportRequestService"; // Adjust the import path

const SupportRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllSupportRequestsF();
        setRequests(data);
      } catch (error) {
        setError("Failed to fetch support requests");
        console.error("Failed to fetch support requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleViewDetails = (requestId) => {
    navigate(`/admin/support-requests/${requestId}`);
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "supportRequestId",
      key: "supportRequestId",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.supportRequestId)}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <h2>Support Requests</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Table
        columns={columns}
        dataSource={requests}
        rowKey="supportRequestId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default SupportRequestList;
