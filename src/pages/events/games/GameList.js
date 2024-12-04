import React, { useState, useEffect } from "react";
import { Table, Button, Space, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getAllGames,
  deleteGame,
} from "../../../services/CommunicationInterne/GameService";
import { evaluateGamesAndEvents } from "../../../services/CommunicationInterne/EvaluationService"; // Import the evaluation service

const GameList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(""); // To show evaluation status
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getAllGames();
        setGames(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch games");
        console.error("Failed to fetch games:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleEvaluate = async () => {
    try {
      const response = await evaluateGamesAndEvents(); // Call the evaluation function
      setStatus(response); // Set the response from the evaluation
      // Optionally, refresh the game list after evaluation
      const data = await getAllGames();
      setGames(data);
    } catch (error) {
      setStatus("Error during evaluation: " + error.message); // Display error
    }
  };

  const handleEdit = (gameId) => {
    navigate(`/admin/game-list/edit/${gameId}`);
  };

  const handleDelete = async (gameId) => {
    try {
      await deleteGame(gameId);
      setGames((prev) => prev.filter((game) => game.gameId !== gameId));
      message.success("Game deleted successfully!");
    } catch (error) {
      setError("Failed to delete game");
      console.error("Failed to delete game:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/game-list/add");
  };

  const handleDetails = (gameId) => {
    navigate(`/admin/game-list/${gameId}`);
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Game ID",
      dataIndex: "gameId",
      key: "gameId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Game",
      dataIndex: "startGame",
      key: "startGame",
      render: (startGame) => new Date(startGame).toLocaleDateString(),
    },
    {
      title: "End Game",
      dataIndex: "endGame",
      key: "endGame",
      render: (endGame) => new Date(endGame).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleDetails(record.gameId)}
          >
            Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.gameId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.gameId)}
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
    total: games.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Game List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {status && <p>{status}</p>} {/* Show evaluation status */}
      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Game
        </Button>
        <Button
          type="primary"
          onClick={handleEvaluate} // Trigger evaluation
          style={{ marginLeft: 16 }}
        >
          Evaluate Games and Events
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={games}
        pagination={paginationProps}
        rowKey="gameId"
        bordered
        loading={loading}
      />
    </div>
  );
};

export default GameList;
