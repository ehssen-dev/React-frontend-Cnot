import React, { useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResultService from "../../../../services/CommunicationInterne/ResultService"; // Adjust the import path

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await ResultService.getAllResults();
        setResults(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch results");
        console.error("Failed to fetch results:", error);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleEdit = (resultId) => {
    navigate(`/admin/result-list/edit/${resultId}`);
  };

  const handleDelete = async (resultId) => {
    try {
      await ResultService.deleteResult(resultId);
      setResults((prev) =>
        prev.filter((result) => result.resultId !== resultId)
      );
      message.success("Result deleted successfully!");
    } catch (error) {
      setError("Failed to delete result");
      console.error("Failed to delete result:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/result-list/add");
  };

  const handleDetails = (resultId) => {
    navigate(`/admin/result-list/${resultId}`);
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Result Number",
      dataIndex: "resultNumber",
      key: "resultNumber",
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
    },
    {
      title: "Runner-Up",
      dataIndex: "runnerUp",
      key: "runnerUp",
    },
    {
      title: "Third Place",
      dataIndex: "thirdPlace",
      key: "thirdPlace",
    },
    {
      title: "Scores",
      dataIndex: "scores",
      key: "scores",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
      render: (game) => (game ? game.name : "N/A"), // Assuming `game` has a `name` property
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleDetails(record.resultId)}
          >
            Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.resultId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.resultId)}
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
    total: results.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Result List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Result
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={results}
        pagination={paginationProps}
        rowKey="resultId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default ResultList;
