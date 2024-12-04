import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, message, Spin } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SupportResponseService from "../../../services/CommunicationInterne/SupportResponseService"; // Adjust import path

const SupportResponseListAthlete = () => {
  const [supportResponses, setSupportResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    navigate(`/athlete/support-responses/${supportResponseId}`);
  };

  const handleEdit = (supportResponseId) => {
    navigate(`/athlete/support-responses/edit/${supportResponseId}`);
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
    navigate("/athlete/support-responses/add");
  };

  return (
    <div
      style={{ padding: 20, backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      <Typography variant="h4" gutterBottom>
        Your Support Responses
      </Typography>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}></div>
          <Row gutter={16}>
            {supportResponses.map((response) => (
              <Col
                span={8}
                key={response.supportResponseId}
                style={{ marginBottom: 16 }}
              >
                <Card
                  title={`Response ID: ${response.supportResponseId}`}
                  bordered
                  hoverable
                  actions={[
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() =>
                        handleViewDetails(response.supportResponseId)
                      }
                    >
                      View
                    </Button>,
                  ]}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <p>
                    <strong>Message:</strong> {response.message}
                  </p>
                  <p>
                    <strong>Amount:</strong> {response.montant}
                  </p>
                  <p>
                    <strong>Created Date:</strong>{" "}
                    {new Date(response.createdDate).toLocaleDateString()}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default SupportResponseListAthlete;
