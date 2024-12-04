import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Modal, List, Tag } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getAllEvents,
  deleteEvent,
  evaluateEventProgress,
} from "../../services/CommunicationInterne/EventService"; // Adjust the import path

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [evaluating, setEvaluating] = useState(false); // Track evaluation state
  const [evaluationMessages, setEvaluationMessages] = useState([]); // Store evaluation messages
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch events");
        console.error("Failed to fetch events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewDetails = (eventId) => {
    navigate(`/admin/event-list/${eventId}`);
  };

  const handleEdit = (eventId) => {
    navigate(`/admin/event-list/edit/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents((prev) => prev.filter((event) => event.eventId !== eventId));
      message.success("Event deleted successfully!");
    } catch (error) {
      setError("Failed to delete event");
      console.error("Failed to delete event:", error);
    }
  };

  const handleAdd = () => {
    navigate("/admin/event-list/add");
  };

  const handleEvaluate = async () => {
    try {
      setEvaluating(true); // Set evaluating state to true
      const result = await evaluateEventProgress();
      const messages = result.split("\n"); // Assume each message is separated by a newline
      setEvaluationMessages(messages);
      setIsModalVisible(true); // Show modal with messages
    } catch (error) {
      message.error("Failed to evaluate event progress: " + error.message);
    } finally {
      setEvaluating(false); // Reset evaluating state
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "Event ID",
      dataIndex: "eventId",
      key: "eventId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startEvent",
      key: "startEvent",
      render: (startEvent) => new Date(startEvent).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endEvent",
      key: "endEvent",
      render: (endEvent) => new Date(endEvent).toLocaleDateString(),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record.eventId)}
          >
            View Details
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.eventId)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.eventId)}
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
    total: events.length,
    onChange: handlePageChange,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          Add New Event
        </Button>

        {/* New Button for event evaluation */}
        <Button
          icon={<PlayCircleOutlined />}
          type="default"
          onClick={handleEvaluate}
          loading={evaluating} // Show loading spinner while evaluating
          style={{ marginLeft: 10 }}
        >
          Evaluate Events
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={events}
        pagination={paginationProps}
        rowKey="eventId"
        bordered
        loading={loading}
      />

      {/* Modal for evaluation messages */}
      <Modal
        title="Event Evaluation Summary"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <List
          dataSource={evaluationMessages}
          renderItem={(message) => {
            const isOngoing = message.includes("ongoing");
            const isComplete = message.includes("complete");
            const gamesCompleted = message.match(/(\d+)\/(\d+)/);

            return (
              <List.Item
                style={{
                  borderBottom: "1px solid #e0e0e0",
                  padding: "10px 0",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    fontSize: "16px",
                    color: isOngoing
                      ? "#ff9900"
                      : isComplete
                      ? "#4caf50"
                      : "#000",
                    fontWeight: "500",
                  }}
                >
                  {message}
                </div>

                {/* Display completed games in a more visually appealing way */}
                {gamesCompleted && (
                  <Tag
                    color={isOngoing ? "orange" : "green"}
                    style={{ marginLeft: "10px", fontSize: "14px" }}
                  >
                    {gamesCompleted[0]} Games Completed
                  </Tag>
                )}
              </List.Item>
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default EventList;
