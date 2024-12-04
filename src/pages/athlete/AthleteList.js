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
import AthleteService from "../../services/CommunicationInterne/AthleteService"; // Adjust the import path

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const data = await AthleteService.getAllAthletes();
        setAthletes(data);
      } catch (error) {
        setError("Failed to fetch athletes");
        console.error("Failed to fetch athletes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const handleViewDetails = (athleteId) => {
    navigate(`/admin/athlete-list/${athleteId}`);
  };

  const handleEdit = (athleteId) => {
    navigate(`/admin/athlete-list/edit/${athleteId}`);
  };

  const handleDelete = async (athleteId) => {
    try {
      await AthleteService.deleteAthlete(athleteId);
      setAthletes((prev) =>
        prev.filter((athlete) => athlete.athleteId !== athleteId)
      );
      message.success("Athlete deleted successfully!");
    } catch (error) {
      setError("Failed to delete athlete");
      console.error("Failed to delete athlete:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/athlete-list/add");
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Athlete ID",
      dataIndex: "athleteId",
      key: "athleteId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (dateOfBirth) => new Date(dateOfBirth).toLocaleDateString(),
    },
    {
      title: "Sport",
      dataIndex: "sport",
      key: "sport",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.athleteId)}
          >
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.athleteId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.athleteId)}
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
    total: athletes.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Athlete List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Athlete
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={athletes}
        pagination={paginationProps}
        rowKey="athleteId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default AthleteList;
